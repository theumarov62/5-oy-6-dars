const elTitle = document.getElementById("name");
const description = document.getElementById("description");
const category = document.getElementById("category");
const color = document.getElementById("color");
const colorName = document.getElementById("colorName");
const country = document.getElementById("country");
const doorCount = document.getElementById("doorCount");
const engine = document.getElementById("engine");
const fuelConsumption = document.getElementById("fuelConsumption");
const city = document.getElementById("city");
const combiend = document.getElementById("combiend");
const highway = document.getElementById("highway");
const fuelType = document.getElementById("fuelType");
const horsepower = document.getElementById("horsepower");
const generation = document.getElementById("generation");
const maxSpeed = document.getElementById("maxSpeed");
const seatCount = document.getElementById("seatCount");
const trim = document.getElementById("trim");
const year = document.getElementById("year");
const colorBg = document.getElementById("colorBg");
async function getById(id) {
  document.title = "Yuklanmoqda";
  try {
    const req = await fetch(`https://json-api.uz/api/project/fn44/cars/${id}`);
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ma'lumotni olishda xatolik bo'ldi!");
  }
}

function ui(data) {
  document.title = data.name;
  elTitle.innerText = data.name;
  elTitle.textContent =
    "Nomi: " + (data.name !== undefined ? data.name : "No data");
  combiend.textContent =
    "Combiend: " + (data.combiend !== undefined ? data.combiend : "No data");
  description.textContent =
    "Description: " +
    (data.description !== undefined ? data.description : "No data");
  colorBg.style.background =
    "Color: " + (data.color !== undefined ? data.color : "No data");
  category.textContent =
    "Category: " + (data.category !== undefined ? data.category : "No data");

  colorName.textContent =
    "Color Name: " +
    (data.colorName !== undefined ? data.colorName : "No data");

  country.textContent =
    "Davlat: " + (data.country !== undefined ? data.country : "No data");

  doorCount.textContent =
    "DoorCount: " + (data.doorCount !== undefined ? data.doorCount : "No data");

  engine.textContent =
    "Engine: " + (data.engine !== undefined ? data.engine : "No data");

  city.textContent =
    "City: " +
    (data.fuelConsumption.city !== undefined
      ? data.fuelConsumption.city
      : "No data");

  highway.textContent =
    "Highway: " +
    (data.fuelConsumption.highway !== undefined
      ? data.fuelConsumption.highway
      : "No data");

  fuelType.textContent =
    "FuelType: " + (data.fuelType !== undefined ? data.fuelType : "No data");

  horsepower.textContent =
    "HorsePower: " +
    (data.horsepower !== undefined ? data.horsepower : "No data");

  generation.textContent =
    "Generation: " +
    (data.generation !== undefined ? data.generation : "No data");

  maxSpeed.textContent =
    "maxSpeed: " + (data.maxSpeed !== undefined ? data.maxSpeed : "No data");

  seatCount.textContent =
    "SeatCount: " + (data.seatCount !== undefined ? data.seatCount : "No data");

  trim.textContent =
    "Trim: " + (data.trim !== undefined ? data.trim : "No data");

  year.textContent =
    "Year: " + (data.year !== undefined ? data.year : "No data");
}
window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  getById(id)
    .then((res) => {
      ui(res);
    })
    .catch((err) => {})
    .finally(() => {});
});
