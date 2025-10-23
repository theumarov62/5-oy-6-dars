export function ui(data) {
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = null;

  data.forEach((element) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content;

    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elInfoBtn = clone.querySelector(".js-info");
    const elEditBtn = clone.querySelector(".js-edit");
    const elDeleteBtn = clone.querySelector(".js-delete");
    const country = clone.querySelector("#country");
    const trim = clone.querySelector("#trim");
    const color = clone.querySelector("#color");
    const year = clone.querySelector("#year");
    const maxSpeed = clone.querySelector("#maxSpeed");
    // ID
    elTitle.textContent = element.name;
    elInfoBtn.href = `/pages/details.html?id=${element.id}`;
    elDeleteBtn.id = element.id;
    elEditBtn.id = element.id;

    elDescription.textContent = "Description: " + element.description;
    trim.textContent = "Trim: " + element.trim;
    country.textContent = "Davlat: " + element.country;
    color.style.background = element.color;
    year.textContent = "Year: " + element.year;
    maxSpeed.textContent = "MaxSpeed: " + element.maxSpeed;
    elContainer.appendChild(clone);
  });
}

export function pagination(total, limit, skip) {
  const elPagination = document.getElementById("pagination");
  elPagination.innerHTML = "";
  const remained = total % limit;
  const pageCount = (total - remained) / limit;
  let activePage = skip / limit + 1;

  for (let i = 1; i <= pageCount + (remained > 0 ? 1 : 0); i++) {
    const button = document.createElement("button");
    button.classList.add(
      "join-item",
      "btn",
      "bg-white",
      "text-black",
      "js-page",
      activePage === i ? "btn-active" : null
    );

    button.innerText = i;

    button.dataset.skip = limit * i - limit;
    elPagination.appendChild(button);
  }
}
