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

    // ID
    elTitle.innerText = element.name;
    elInfoBtn.id = element.id;
    elDeleteBtn.id = element.id;
    elEditBtn.id = element.id;

    elDescription.innerText = element.description;
    trim.innerText = "Trim: " + element.trim;
    country.innerText = "Country: " + element.country;
    color.style.background = element.color;
    year.innerText = "Year: " + element.year;
    elContainer.appendChild(clone);
  });
}
