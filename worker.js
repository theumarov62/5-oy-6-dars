function test() {
  for (let i = 0; i <= 100000; i++) {
    console.log(i);
  }
}

onmessage = (evt) => {
  if (evt.data === "test") test();
};
