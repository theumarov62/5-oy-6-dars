export function ui(data) {
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = null;
  data.forEach((element) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content;

    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const country = clone.querySelector("#country");
    const trim = clone.querySelector("#trim");
    const color = clone.querySelector("#color");
    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    trim.innerText = element.trim;
    country.innerText = element.country;
    color.style.background = element.color;
    elContainer.appendChild(clone);
  });
}
