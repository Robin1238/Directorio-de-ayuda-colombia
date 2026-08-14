import { SITES } from "./data.js";

const TYPE_LABEL = {
  map: "Mapa",
  needs: "Solicitar ayuda",
  pets: "Mascotas",
  offers: "Ofrecer ayuda",
  directory: "Directorio",
};

const grid = document.getElementById("grid");
const emptyMessage = document.getElementById("empty");
const countLine = document.getElementById("countLine");
const searchInput = document.getElementById("search");

function showSites() {
  const searchTetx = searchInput.value.trim().toLowerCase();

  const sitesFound = SITES.filter((site) => {
    const siteText = (
      site.name +
      " " +
      site.desc +
      " " +
      site.cities.join(" ")
    ).toLowerCase();

    return searchTetx === "" || siteText.includes(searchTetx);
  }).sort((a, b) => Number(b.official) - Number(a.official));

  grid.innerHTML = "";

  sitesFound.forEach((site) => {
    const card = document.createElement("a");
    card.className = `card${site.official ? " official" : ""}`;
    card.href = site.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const cities = site.cities
      .map((city) => `<span class="tag city">${city}</span>`)
      .join("");

    const types = (site.types ?? [])
      .map((type) => {
        const label = TYPE_LABEL[type] ?? type;
        return `<span class="tag type">${label}</span>`;
      })
      .join("");

    card.innerHTML = `
      ${
        site.official
          ? `<span class="source-badge">Fuente oficial</span>`
          : `<span class="source-badge community">Iniciativa comunitaria</span>`
      }

      <h3>${site.name}</h3>

      <p class="desc">${site.desc}</p>

      <div class="tags">
        ${cities}
        ${types}
      </div>

      <div class="card-foot">
        <span class="url-hint">
          ${site.url.replace(/^https?:\/\//, "")}
        </span>


      <span class="visit">
        Visitar ↗
      </span>

      </div>
    `;

    grid.appendChild(card);
  });

  emptyMessage.hidden = sitesFound.length !== 0;

  countLine.textContent = `${sitesFound.length} de ${SITES.length} sitios`;
}

searchInput.addEventListener("input", showSites);

showSites();
