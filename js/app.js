import { checkAuth } from "./pages/check-auth.js";
import { deleteElementLocal } from "./pages/crud.js";
import { changeLocalData } from "./pages/local-data.js";
import { deleteElement, getAll } from "./request.js";
import { ui } from "./ui.js";
const elToast = document.getElementById("toast");
const offlineAudio = document.getElementById("offlineAudio");
const elContainer = document.getElementById("container");
const offlinePage = document.getElementById("offlinePage");
const elToastText = document.getElementById("toastText");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elFilterValeuSelect = document.getElementById("filterValueSelect");
const elSearchInput = document.getElementById("searchInput");
const elNoData = document.getElementById("noData");
const elSearchAudio = document.getElementById("searchAudio");
const elBackspace = document.getElementById("backspace");
const elBomb = document.getElementById("bomb");

let backendData = null;
let uiData = null;
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
      changeLocalData(backendData.data);
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
    response.result.forEach((el) => {
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

// CRUD

// Edit
elContainer.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("js-edit")) {
    if (checkAuth()) {
    } else {
    }
  }
});

// Delete
const deleteModal = document.getElementById("deleteModal");
elContainer.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("js-delete")) {
    if (checkAuth() && confirm("Rostan ham o'chirmoqchimisiz?")) {
      deleteElement(target.id)
        .then((id) => {
          deleteElementLocal(id);
        })
        .catch()
        .finally(() => {});
    } else {
      window.location.href = "/pages/login.html";

      alert("Register qiling avval");
    }
  }
});

// Info
elContainer.addEventListener("click", (evt) => {});

elSearchInput.addEventListener("keydown", (e) => {
  if (e.key.length === 1) {
    elSearchAudio.currentTime = 0;
    elSearchAudio.play();
  }

  if (e.key.length === 0) {
    elBomb.currentTime = 0;
    elBomb.play();
  }

  if (
    (e.key === "Backspace" || e.key === "Delete") &&
    elSearchInput.value.length > 0
  ) {
    elBackspace.currentTime = 0;
    elBackspace.play();
  }
});
