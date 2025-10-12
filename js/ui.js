export function ui(data) {
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = null;
  data.forEach((element) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content;

    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const country = clone.querySelector("span");
    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    country.innerText = element.country;
    elContainer.appendChild(clone);
  });
}
