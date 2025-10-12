import { getAll } from "./request.js";
import { ui } from "./ui.js";
const elToast = document.getElementById("toast");
const offlineAudio = document.getElementById("offlineAudio");
const offlinePage = document.getElementById("offlinePage");
const elToastText = document.getElementById("toastText");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elFilterValeuSelect = document.getElementById("filterValueSelect");
const elSearchInput = document.getElementById("searchInput");
const elNoData = document.getElementById("noData");
let backendData = null;
let worker = new Worker("./worker.js");
let filterKey = null;
let filterValue = null;
window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === false) {
    offlinePage.classList.remove("hidden");
  } else {
    offlinePage.classList.add("hidden");
  }

  getAll()
    .then((res) => {
      backendData = res;
      ui(backendData.data);
    })
    .catch((error) => {
      elToastText.textContent = error.message;
    });
});

elFilterTypeSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  filterKey = value;
  if (backendData) {
    worker.postMessage({
      functionName: "filterByType",
      params: [backendData.data, value],
    });
  }
});

elFilterValeuSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  filterValue = value;

  if (filterKey && filterValue) {
    getAll(`?${filterKey}=${filterValue}`)
      .then((res) => {
        ui(res.data);
      })
      .catch((error) => {
        elToastText.textContent = error.message;
      });
  }
});

elSearchInput.addEventListener("change", (evt) => {
  const key = evt.target.value;
  worker.postMessage({
    functionName: "search",
    params: [backendData.data, key],
  });
});

worker.addEventListener("message", (evt) => {
  const response = evt.data;

  if (response.target === "filterByType") {
    elFilterValeuSelect.classList.remove("hidden");
    elFilterValeuSelect.innerHTML = "";
    const option = document.createElement("option");
    option.selected = true;
    option.disabled = true;
    option.textContent = "All";
    elFilterValeuSelect.appendChild(option);
    result.forEach((el) => {
      const option = document.createElement("option");
      option.textContent = el;
      option.value = el;
      elFilterValeuSelect.appendChild(option);
    });
  } else if (response.target === "search") {
    const elContainer = document.getElementById("container");
    elContainer.innerHTML = null;
    if (response.result.length > 0) {
      ui(response.result);
    } else {
      elNoData.classList.remove("hidden");
      elNoData.textContent = "No Result";
    }
  }
});

window.addEventListener("online", () => {
  offlinePage.classList.add("hidden");
});
window.addEventListener("offline", () => {
  offlineAudio.play();
  offlinePage.classList.remove("hidden");
});
