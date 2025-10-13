const baseURL = "https://json-api.uz/api/project/fn44";
const loader = document.getElementById("loader");

const mainSection = document.querySelector("section");
export async function getAll(query = "") {
  try {
    loader.classList.remove("hidden");
    loader.classList.add("flex");
    mainSection.style.display = "none";
    
    const req = await fetch(baseURL + `/cars${query ? query : ""}`);
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ma'lumotlarni olishda xatolik bo'ldi!");
  } finally {
    loader.classList.add("hidden");
    loader.classList.remove("flex");
    mainSection.style.display = "block"; // qayta ko‘rsat
  }
}

export async function getById(id) {
  try {
    const req = await fetch(baseURL + `/cars/${id}`);
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ma'lumotni olishda xatolik bo'ldi!");
  }
}

export async function addElement(newData) {
  try {
    const token = localStorage.getItem("token");
    const req = await fetch(baseURL + "/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ma'lumotni qo'shishda xatolik bo'ldi!");
  }
}

export async function editElement(editedData) {
  try {
    const token = localStorage.getItem("token");
    const req = await fetch(baseURL + `/cars/${editedData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedData),
    });
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ma'lumotni tahrirlashda xatolik bo'ldi!");
  }
}

export async function getDelete(id) {
  try {
    const token = localStorage.getItem("token");
    await fetch(baseURL + `/cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch {
    throw new Error("Ma'lumotni o'chirishda xatolik bo'ldi!");
  }
}
