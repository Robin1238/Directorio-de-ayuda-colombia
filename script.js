import { SITES } from "./data.js";

const TYPE_LABEL = {
  map: "Mapa",
  needs: "Reporta necesidad",
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
  });

  grid.innerHTML = "";

  sitesFound.forEach((site) => {
    const card = document.createElement("div");
    card.className = "card";

    const cities = site.cities
      .map((city) => `<span class="tag city">${city}</span>`)
      .join("");

    const types = site.types
      .map((type) => `<span class="tag type-${type}">${TYPE_LABEL[type]}</span>`)
      .join("");

    card.innerHTML = `
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

        <a
          class="visit"
          href="${site.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar ↗
        </a>
      </div>
    `;

    grid.appendChild(card);
  });

  emptyMessage.hidden = sitesFound.length !== 0;

  countLine.textContent = `${sitesFound.length} de ${SITES.length} sitios`;
}

searchInput.addEventListener("input", showSites);

showSites();
