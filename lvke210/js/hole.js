function getHoleList() {
  fetch("http://119.3.26.182:3000/api/getHoleList").then((res) => console.log(res));
  // .then((data) => {
  //   console.log(data);
  // });
}
// getHoleList();
holebtn.addEventListener("click", () => {
  console.log(1);
  getHoleList();
});
