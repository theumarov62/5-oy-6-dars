const baseURL = "https://json-api.uz/api/project/fn44";
const loader = document.getElementById("loader");
const mainSection = document.querySelector("section");
const toast = document.getElementById("toast");
const elToastText = document.getElementById("toastText");
// Toast warning textContent
function toastWarning() {
  elToast.classList.remove("hidden");
  elToastText.textContent = "Ro‘yxatdan o‘tmagansiz!";
  setTimeout(() => {
    elToast.classList.add("hidden");
  }, 3000);
}

export async function getAll(query = "") {
  try {
    loader.classList.remove("-translate-y-full");
    loader.classList.add("translate-y-0");

    const req = await fetch(`${baseURL}/cars${query ? query : ""}`);
    const res = await req.json();

    if (!req.ok) throw new Error(res.message || "Ma’lumotlarni olishda xato!");
    return res;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    loader.classList.remove("translate-y-0");
    loader.classList.add("-translate-y-full");

    setTimeout(() => {
      mainSection.style.display = "block";
    }, 600);
  }
}

// AddCar
export async function addElement(newData) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast("Ro'yhatdan o'tmagansiz");
    return;
  }

  try {
    const req = await fetch(`${baseURL}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const res = await req.json();
    if (!req.ok)
      throw new Error(res.message || "Ma’lumotni qo‘shishda xato bo‘ldi!");
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Edit
export async function editElement(editedData) {
  const token = localStorage.getItem("token");

  if (!token) {
    toastWarning();
    return;
  }

  try {
    const req = await fetch(`${baseURL}/cars/${editedData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedData),
    });

    const res = await req.json();
    if (!req.ok) {
      toastWarning();
      return res;
    }
  } catch (error) {
    toastWarning();
  }
}

// Delete
export async function deleteElement(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    elToastText.textContent = `Ro'yhatdan o'ting`;
  }

  try {
    const req = await fetch(`${baseURL}/cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!req.ok) {
      const res = await req.json();
      throw new Error(res.message || "Ma’lumotni o‘chirishda xato bo‘ldi!");
    }

    return id;
  } catch (error) {
    throw new Error(error.message);
  }
}
