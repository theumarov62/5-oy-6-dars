export const darkBtn = document.getElementById("dark");
const body = document.body;
const desc = document.getElementById("desc");

export function updateDarkMode() {
  body.classList.toggle("bg-black");
  body.classList.toggle("text-white");

  darkBtn.className = "";

  if (body.classList.contains("bg-black")) {
    localStorage.setItem("darkMode", "enabled");
    darkBtn.textContent = "Light";

    darkBtn.classList.add(
      "w-[130px]",
      "h-[45px]",
      "bg-black",
      "text-white",
      "flex",
      "items-center",
      "justify-center",
      "border-[2px]",
      "border-white",
      "cursor-pointer",
      "rounded-[8px]",
      "absolute",
      "right-[180px]",
      "top-[15px]"
    );
    desc.classList.add("text-white");
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkBtn.textContent = "Dark";

    darkBtn.classList.add(
      "w-[130px]",
      "h-[45px]",
      "bg-white",
      "text-black",
      "flex",
      "items-center",
      "justify-center",
      "border-[2px]",
      "border-black",
      "cursor-pointer",
      "rounded-[8px]",
      "border-[2px]",
      "border-black",
      "absolute",
      "right-[180px]",
      "top-[15px]"
    );
    desc.classList.add("text-gray-700");
  }
}

export function loadDarkMode() {
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("bg-black", "text-white");
    darkBtn.textContent = "Light";
    darkBtn.classList.add(
      "w-[130px]",
      "h-[45px]",
      "bg-black",
      "text-white",
      "flex",
      "items-center",
      "justify-center",
      "border-[2px]",
      "border-white"
    );
  } else {
    body.classList.remove("bg-black", "text-white");
    darkBtn.textContent = "Dark";
    darkBtn.classList.add(
      "w-[130px]",
      "h-[45px]",
      "bg-white",
      "text-black",
      "flex",
      "items-center",
      "justify-center",
      "border-[2px]",
      "border-black"
    );
  }
}
