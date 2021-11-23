const child = document.querySelector(".childbar").getElementsByTagName("div");
const home = document.querySelector("#home");
for (let i = 0; i < child.length; i++) {
  child[i].addEventListener("click", function (item) {
    for (let j = 0; j < child.length; j++) {
      child[j].className = "";
      child[i].className = "active";
    }
  });
}
let jokeList = []; //
getJoke();

window.onscroll = () => {
  console.log(isBottom());
  if (scrollTop() + windowHeight() + 50 > documentHeight()) {
    getJoke();
  }
};
// 请求笑话
function getJoke() {
  for (let i = 0; i < 5; i++) {
    fetch("https://autumnfish.cn/api/joke")
      .then((res) => res.text())
      .then((val) => {
        let block;
        const str = `
        <div class="block-title">天天开心</div>
                <div class="flex block-content">
                  <div class="block-left">
                    <img src="https://picsum.photos/200/150?random=${i + 1}" alt="" />
                  </div>
                  <div class="block-right">
                   ${val ?? "网络不好，请稍后再试"}
                  </div>
                </div>
                <div class="block-footer">
                    --hello world
                </div>
        `;
        block = document.createElement("div");
        block.className = "block";
        block.innerHTML = str;
        home.appendChild(block);
      });
  }
}

function scrollTop() {
  return Math.max(
    //chrome
    document.body.scrollTop,
    //firefox/IE
    document.documentElement.scrollTop
  );
}
//获取页面文档的总高度
function documentHeight() {
  //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

function windowHeight() {
  return document.compatMode == "CSS1Compat"
    ? document.documentElement.clientHeight
    : document.body.clientHeight;
}

const isBottom = () => {
  const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  const windowHeight =
    document.compatMode == "CSS1Compat"
      ? document.documentElement.clientHeight
      : document.body.clientHeight;
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  return scrollTop + windowHeight + 50 > documentHeight;
};
