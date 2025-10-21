import { checkAuth } from "./pages/check-auth.js";
import {
  deleteElementLocal,
  editElementLocal,
  addElementLocal,
} from "./pages/crud.js";
import { getFormData } from "./pages/get-form-data.js";
import { changeLocalData, localData } from "./pages/local-data.js";
import { deleteElement, editElement, getAll, addElement } from "./request.js";
import { pagination, ui } from "./ui.js";
// Channel
const channel1 = new BroadcastChannel("channel_1");

channel1.onmessage = (evt) => {
  if (evt.data.action === "redirect") {
    window.location.href = evt.data.address;
  }

  if (evt.data.action === "delete") {
    deleteElementLocal(evt.data.address);
  }

  if (evt.data.action === "edit") {
    editElementLocal(evt.data.address);
  }
};

// Page Skip and Limit
const limit = 12;
let skip = 0;

// HTML Selection
const elToast = document.getElementById("toast");
const offlineAudio = document.getElementById("offlineAudio");
const elEditForm = document.getElementById("editForm");
const elContainer = document.getElementById("container");
const offlinePage = document.getElementById("offlinePage");
const elToastText = document.getElementById("toastText");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elFilterValeuSelect = document.getElementById("filterValueSelect");
const elSearchInput = document.getElementById("searchInput");
const elNoData = document.getElementById("nodata");
const elSearchAudio = document.getElementById("searchAudio");
const elBackspace = document.getElementById("backspace");
const elPagination = document.getElementById("pagination");
const elBomb = document.getElementById("bomb");
const registerAlert = document.getElementById("registerAlert");
const closeAlert = document.getElementById("closeAlert");
const goRegister = document.getElementById("goRegister");
const elEditModal = document.getElementById("editModal");
const elNoDataImg = document.getElementById("noDataImg");
const curtain = document.getElementById("curtain");
const content = document.getElementById("content");
const carsList = document.getElementById("cars");

// Variables
let backendData = null;
let uiData = null;
let editedElementId = null;
let worker = new Worker("./worker.js");
let filterKey = null;
let filterValue = null;

// Register Modal
closeAlert.addEventListener("click", () => {
  registerAlert.classList.add("hidden");
});

goRegister.addEventListener("click", () => {
  window.location.href = "./pages/register.html";
});

// Warning
function warning() {
  channel1.postMessage({ action: "redirect", address: "/pages/login.html" });
  registerAlert.classList.remove("hidden");
}
goRegister.addEventListener("click", () => {
  registerAlert.classList.add("hidden");
  channel1.postMessage({ action: "redirect", address: "/pages/register.html" });
  window.location.href = "/pages/register.html";
});
// Offline and Online event
window.addEventListener("online", () => {
  offlinePage.classList.add("hidden");
});
window.addEventListener("offline", () => {
  offlineAudio.play();
  offlinePage.classList.remove("hidden");
});

// Web Worker
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
      elNoDataImg.src = "";
    } else {
      elNoData.classList.remove("hidden");
      elNoData.classList.add("flex");
      elNoDataImg.src = "./images/no-data.jfif";
    }
  }
});

// ContentLoaded Offline or Online
window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === false) {
    offlinePage.classList.remove("hidden");
  } else {
    offlinePage.classList.add("hidden");
  }

  getAll(`?limit=${limit}&skip=${skip}`)
    .then((res) => {
      backendData = res;
      pagination(backendData.total, backendData.limit, backendData.skip);
      changeLocalData(backendData.data);
    })
    .catch((error) => {
      elToast.classList.remove("hidden");

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
        elToast.classList.remove("hidden");

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

// CRUD
elContainer.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("js-edit")) {
    if (checkAuth()) {
      editedElementId = target.id;
      elEditModal.showModal();
      const foundElement = localData.find((el) => el.id == target.id);
      elEditForm.name.value = foundElement.name;
      elEditForm.description.value = foundElement.description;
    } else {
      warning();
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
          channel1.postMessage({ action: "delete", address: id });
        })
        .catch()
        .finally(() => {});
    } else {
      warning();
    }
  }
});

// Info
elContainer.addEventListener("click", (evt) => {});

// Search
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

// Edit
elEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const result = getFormData(elEditForm);

  if (editedElementId) {
    result.id = editedElementId;
    editElement(result)
      .then((res) => {
        editElementLocal(res);
        channel1.postMessage({ action: "edit", address: res });
      })
      .catch((er) => {})
      .finally(() => {
        editedElementId = null;
        elEditModal.close();
      });
  }
});

// AddCar
const elAddForm = document.getElementById("form");

if (elAddForm) {
  elAddForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const newData = getFormData(elAddForm);

    const token = localStorage.getItem("token");
    if (!token) {
      toastWarning();
      return;
    }

    addElement(newData)
      .then((res) => {
        if (res) {
          elToast.classList.remove("hidden");
          elToastText.textContent = "Ma'lumot Qo'shildi!";
          setTimeout(() => {
            elToast.classList.add("hidden");
          }, 3000);
          elAddForm.reset();

          getAll(`?limit=${limit}&skip=${skip}`).then((r) => {
            ui(r.data);
          });
        }
      })
      .catch((err) => {
        toastWarning();
      });
  });
}

function toastWarning() {
  elToast.classList.remove("hidden");
  elToastText.textContent = "Ro‘yxatdan o‘tmagansiz!";
  setTimeout(() => {
    elToast.classList.add("hidden");
  }, 3000);
}

// Pagination
elPagination.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("js-page")) {
    skip = evt.target.dataset.skip;
    getAll(`?limit=${limit}&skip=${skip}`)
      .then((res) => {
        ui(res.data);
        pagination(res.total, res.limit, res.skip);
      })
      .catch((error) => {
        elToast.classList.remove("hidden");
        elToastText.textContent = error.message;
        setTimeout(() => {
          elToast.classList.add("hidden");
        }, 3000);
      });
  }
});
