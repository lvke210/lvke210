const child = document.querySelector(".childbar").getElementsByTagName("div");
const content = document.querySelectorAll(".content");
const home = document.querySelector("#home");
const totop = document.querySelector("#totop");
for (let i = 0; i < child.length; i++) {
  child[i].addEventListener("click", function (item) {
    for (let j = 0; j < child.length; j++) {
      child[j].className = "";
      child[i].className = "active";
      content[j].className = "content";
      content[i].className = "content act";
    }
  });
}
let jokeList = []; //
let num = 1; //请求随机图片的计数
let timer;

window.onscroll = () => {
  if (timer) {
    clearTimeout(timer);
    timer = undefined;
  }
  timer = setTimeout(() => {
    if (isBottom(50)) {
      getJoke();
    }
  }, 1000);
  totop.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
};

// 请求笑话
function getJoke() {
  for (let i = 0; i < 5; i++) {
    num++;
    fetch("https://autumnfish.cn/api/joke")
      .then((res) => res.text())
      .then((val) => {
        let block;
        const str = `
        <div class="block-title"></div>
        <div class="flex block-content">
          <div class="block-left">
            <img src="https://picsum.photos/200/150?random=${num + i}" alt="" />
          </div>
          <div class="block-right">
           ${val ?? "网络不好，请稍后再试"}
          </div>
        </div>
        <div class="block-footer">
        <img src="./static/2.gif" style="height:50px" alt="">-------------------
        </div>
        `;
        block = document.createElement("div");
        block.className = "block";
        block.innerHTML = str;
        home.appendChild(block);
      });
  }
}
getJoke();
const isBottom = (distance) => {
  // 滚动过的距离
  const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  //窗口高度
  const windowHeight =
    document.compatMode == "CSS1Compat"
      ? document.documentElement.clientHeight
      : document.body.clientHeight;
  //获取页面文档的总高度
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  return scrollTop + windowHeight + distance > documentHeight;
};

//节流函数
function throttle(fn, delay) {
  let flag = true;
  return function () {
    flag = true;
    let time;
    if (flag) {
      clearInterval(time);
      time = setTimeout(() => {
        fn.call(this);
        flag = false;
      }, delay);
    }
  };
}
//防抖函数

//返回顶部
totop.addEventListener("click", function () {
  let tim = setInterval(() => {
    let scrollTop = document.documentElement.scrollTop;
    scrollTop > 0
      ? (document.documentElement.scrollTop -= Math.max(scrollTop / 50, 30))
      : clearInterval(tim);
  }, 16);
});
