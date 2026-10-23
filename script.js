/* Lambert Sébastien SRL — interactions de la page */
(function () {
  "use strict";

  /* ------------------------------------------------ année du copyright -- */
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  /* ------------------------------------------------ ombre de l'en-tête -- */
  var header = document.getElementById("header");
  var onScroll = function () {
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------ menu mobile --- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  var closeNav = function () {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  };

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { closeNav(); }
  });

  /* --------------------------------------------------------- filtres ---- */
  var filters = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
  var empty = document.getElementById("galleryEmpty");

  /* Photos actuellement affichées — pilote aussi la navigation de la visionneuse */
  var visible = cards.slice();

  var applyFilter = function (key) {
    visible = [];
    cards.forEach(function (card) {
      var cats = (card.getAttribute("data-cats") || "").split(" ");
      var show = key === "tous" || cats.indexOf(key) !== -1;
      card.classList.toggle("is-hidden", !show);
      if (show) { visible.push(card); }
    });
    if (empty) { empty.hidden = visible.length > 0; }
  };

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  /* ----------------------------------------------------- visionneuse ---- */
  var lb       = document.getElementById("lightbox");
  var lbImg    = document.getElementById("lbImg");
  var lbTitle  = document.getElementById("lbTitle");
  var lbDetail = document.getElementById("lbDetail");
  var index    = 0;
  var lastFocus = null;

  var render = function () {
    var card = visible[index];
    if (!card) { return; }
    var img = card.querySelector("img");
    lbImg.src = img.getAttribute("src");
    lbImg.alt = img.getAttribute("alt") || "";
    lbTitle.textContent  = card.getAttribute("data-title")  || "";
    lbDetail.textContent = card.getAttribute("data-detail") || "";
  };

  var open = function (card) {
    index = visible.indexOf(card);
    if (index === -1) { return; }
    lastFocus = card;
    render();
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.getElementById("lbClose").focus();
  };

  var close = function () {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) { lastFocus.focus(); }
  };

  var step = function (delta) {
    if (!visible.length) { return; }
    index = (index + delta + visible.length) % visible.length;
    render();
  };

  cards.forEach(function (card) {
    card.addEventListener("click", function () { open(card); });
  });

  /* Ce script est partagé avec les pages juridiques, qui n'ont ni galerie ni
     visionneuse. Sans cette garde, getElementById renvoie null et l'erreur
     interrompt tout le reste du script — menu, thème et formulaires compris. */
  if (lb) {
    document.getElementById("lbClose").addEventListener("click", close);
    document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
    document.getElementById("lbNext").addEventListener("click", function () { step(1); });

    /* Clic sur le fond (hors image et hors boutons) = fermeture */
    lb.addEventListener("click", function (e) {
      if (e.target === lb) { close(); }
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) { return; }
      if (e.key === "Escape")     { close(); }
      if (e.key === "ArrowLeft")  { step(-1); }
      if (e.key === "ArrowRight") { step(1); }
    });

    /* Balayage tactile */
    var startX = null;
    lb.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (startX === null) { return; }
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { step(dx < 0 ? 1 : -1); }
      startX = null;
    }, { passive: true });
  }

  /* ------------------------------------------------ formulaire de devis -- */
  var form = document.getElementById("quoteForm");

  if (form) {
    var errorBox = document.getElementById("quoteError");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nom     = document.getElementById("qNom").value.trim();
      var tel     = document.getElementById("qTel").value.trim();
      var commune = document.getElementById("qCommune").value.trim();
      var projet  = document.getElementById("qProjet").value.trim();

      if (!nom || !tel || !projet) {
        errorBox.hidden = false;
        return;
      }
      errorBox.hidden = true;

      var corps =
        "Nom : " + nom + "\n" +
        "Téléphone : " + tel + "\n" +
        "Commune : " + (commune || "non précisée") + "\n\n" +
        "Projet :\n" + projet + "\n";

      window.location.href =
        "mailto:lambertseba73@gmail.com" +
        "?subject=" + encodeURIComponent("Demande de devis — " + nom) +
        "&body=" + encodeURIComponent(corps);
    });
  }

  /* ------------------------------------------------- bascule de thème ---- */
  var themeToggle = document.getElementById("themeToggle");

  var applyTheme = function (mode) {
    var dark = mode === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    if (themeToggle) {
      themeToggle.setAttribute("aria-checked", String(dark));
      themeToggle.setAttribute("aria-label", dark ? "Activer le mode clair" : "Activer le mode sombre");
    }
  };

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (err) { stored = null; }

  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = themeToggle.getAttribute("aria-checked") === "true" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (err) { /* stockage indisponible */ }
    });
  }

  /* --------------------------------------------- inscription pied de page */
  var nl = document.getElementById("newsletterForm");

  if (nl) {
    var nlMsg = document.getElementById("nlMsg");
    var nlEmail = document.getElementById("nlEmail");
    var nlConsent = document.getElementById("nlConsent");

    nl.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = nlEmail.value.trim();

      if (!value || value.indexOf("@") === -1 || value.indexOf(".") === -1) {
        nlMsg.hidden = false;
        nlMsg.textContent = "Merci d'indiquer une adresse e-mail valide.";
        return;
      }

      /* Le consentement conditionne l'envoi : affiché mais non vérifié, il
         n'aurait aucune valeur juridique. */
      if (nlConsent && !nlConsent.checked) {
        nlMsg.hidden = false;
        nlMsg.textContent = "Merci de cocher la case pour accepter de recevoir nos nouvelles.";
        nlConsent.focus();
        return;
      }

      nlMsg.hidden = false;
      nlMsg.textContent = "Merci ! Votre messagerie s'ouvre pour confirmer l'inscription.";

      window.location.href =
        "mailto:lambertseba73@gmail.com" +
        "?subject=" + encodeURIComponent("Inscription aux actualités") +
        "&body=" + encodeURIComponent("Bonjour,\n\nJe souhaite être tenu(e) informé(e) de vos réalisations.\n\nAdresse e-mail : " + value + "\n");
    });
  }

  /* ---------------------------------------------- galerie défilante ------
     Portage du couloir en perspective. Trois points gouvernent la forme :

     1. La profondeur est écrite en *taille apparente*, de façon géométrique :
        chaque carte est un ratio constant plus grande que celle qui la
        précède. Répartir un intervalle de z régulièrement ferait se déchirer
        les cartes proches, car la projection les agrandit trop vite.
     2. Les rails s'ouvrent fort au début puis se stabilisent (fan > 1). Cette
        ouverture compense la croissance encore lente du fond : le ruban
        quitte le centre à plat, se courbe une fois, puis file en diagonale.
     3. Aucune extrémité de la boucle n'est visible. Une carte naît *de
        l'autre côté* de l'axe (railBirth négatif) et le traverse : le centre
        reste couvert en permanence, sans trou clignotant à chaque cycle.

     Toutes les longueurs sont en cqw (pourcentage de la largeur du conteneur),
     donc le couloir garde ses proportions à toute taille.
     --------------------------------------------------------------------- */

  var streamSpace = document.getElementById("streamSpace");

  if (streamSpace) {
    var PATH = {
      perspective: 30,   // force de la projection : plus bas = plus spectaculaire
      cardWidth:   18,
      cardHeight:  25,
      cardRadius:  0.4,
      birthHeight: 2.6,  // hauteur apparente à la naissance
      exitHeight:  46,   // hauteur apparente à la sortie du cadre
      railBirth:  -11,   // négatif : la carte naît de l'autre côté de l'axe
      railExit:    44,
      fan:         3.3,  // > 1 : ouverture précoce puis palier
      turnBirth:   6,
      turnExit:    28,
      stops:       24    // nombre de keyframes traçant la courbe
    };

    var CARDS = 9;   // cartes par rail
    var SPEED = 20;  // secondes pour parcourir tout le couloir

    var PHOTOS = [
      "salle-de-bain-marbre-anthracite-double-vasque",
      "salle-de-bain-beige-douche-et-baignoire",
      "salle-de-bain-noire-baignoire-mur-floral",
      "salle-de-bain-marbre-blanc-douche-italienne",
      "salle-de-bain-sous-combles-meuble-jaune",
      "douche-italienne-pierre-grise",
      "salle-de-bain-chene-double-vasque-ronde",
      "salle-de-bain-carrelage-tropical-meuble-vert",
      "salle-de-bain-moderne-meuble-blanc-douche-pluie",
      "salle-de-bain-marbre-anthracite-douche",
      "baignoire-encastree-habillage-chene",
      "douche-italienne-tout-en-longueur"
    ];

    /* Échantillonne la courbe pour que les keyframes tracent le vrai chemin. */
    var keyframes = function (dir, name) {
      var steps = [];
      for (var s = 0; s <= PATH.stops; s++) {
        var u = s / PATH.stops;
        var scale = (PATH.birthHeight / PATH.cardHeight) *
                    Math.pow(PATH.exitHeight / PATH.birthHeight, u);
        var z = PATH.perspective * (1 - 1 / scale);
        var rail = PATH.railExit -
                   (PATH.railExit - PATH.railBirth) * Math.pow(1 - u, PATH.fan);
        var turn = PATH.turnBirth + (PATH.turnExit - PATH.turnBirth) * u;
        steps.push(
          (u * 100).toFixed(2) + "%{transform:translate3d(" +
          (dir * rail).toFixed(2) + "cqw,0," + z.toFixed(2) + "cqw) rotateY(" +
          (-dir * turn).toFixed(2) + "deg)}"
        );
      }
      return "@keyframes " + name + "{" + steps.join("") + "}";
    };

    var style = document.createElement("style");
    style.textContent =
      keyframes(1, "streamRight") + keyframes(-1, "streamLeft") +
      /* Mettre en pause plutôt que désactiver : chaque carte est déjà lâchée
         en vol par son délai négatif, elle se fige donc en image finie au lieu
         de s'effondrer sur l'axe. */
      "@media(prefers-reduced-motion:reduce){.stream__card{animation-play-state:paused}}";
    document.head.appendChild(style);

    var fragment = document.createDocumentFragment();

    ["streamRight", "streamLeft"].forEach(function (name) {
      for (var i = 0; i < CARDS; i++) {
        var el = document.createElement("div");
        el.className = "stream__card";
        el.style.left = "50%";
        el.style.top = "55%";
        el.style.width = PATH.cardWidth + "cqw";
        el.style.height = PATH.cardHeight + "cqw";
        el.style.marginLeft = (-PATH.cardWidth / 2) + "cqw";
        el.style.marginTop = (-PATH.cardHeight / 2) + "cqw";
        el.style.borderRadius = PATH.cardRadius + "cqw";
        el.style.animation = name + " " + SPEED + "s linear infinite";
        /* Délai négatif : le couloir est déjà rempli dès la première image. */
        el.style.animationDelay = (-(i * SPEED) / CARDS) + "s";

        var img = document.createElement("img");
        img.src = "assets/realisations/" + PHOTOS[i % PHOTOS.length] + ".jpeg";
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        img.draggable = false;
        el.appendChild(img);

        fragment.appendChild(el);
      }
    });

    streamSpace.appendChild(fragment);
  }
})();
