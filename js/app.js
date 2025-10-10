import { getAll } from "./request.js";

const elTimer = document.getElementById("timer");
const f = document.getElementById("f");

// getAll()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((er) => {
//     console.log(er.message);
//   })
//   .finally(() => {
//     console.log("Tugadi");
//   });

setInterval(() => {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  elTimer.innerText = time;
}, 1000);

const worker = new worker("./worker.js");

f.addEventListener("click", () => {
  worker.postMassage("test");
});
