import { message } from "./utils";
const wrap = document.querySelector(".wrap");
const child = document.querySelector(".childbar").getElementsByTagName("div");
const content = document.querySelectorAll(".content");
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
let music = true;

let userInfo = JSON.parse(localStorage.getItem("userInfo")) ?? {};
if (Object.keys(userInfo).length === 0) {
  show_login_btn.innerHTML = "登陆/注册";
} else {
  show_login_btn.innerHTML = userInfo.userName;
}
window.onscroll = () => {
  if (timer) {
    clearTimeout(timer);
    timer = undefined;
  }
  timer = setTimeout(() => {
    if (isBottom(50) && home.className === "content act") {
      getJoke();
    }
  }, 500);
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

//点击之后才会播放背景音乐
window.onclick = () => {
  audio.play();
};
// 切换Bgm
img.addEventListener("click", () => {
  audio.paused;
  audio.src = !music ? "./static/The Ludlows.mp3" : "./static/Aloha Heja He.mp3";
  music = !music;
  audio.play();
});
//开关灯效果
let moon = false;

light.addEventListener("click", (event) => {
  drop(event);
});
function drop(event) {
  moon = !moon;
  if (moon) {
    event.target.appendChild(hat);
    wrap.style.backgroundColor = "rgba(44, 62, 80,1.0)";
    wrap.style.color = "white";
  } else {
    hatbox.appendChild(hat);
    wrap.style.backgroundColor = "white";
    wrap.style.color = "black";
  }
}
function dragover(event) {
  event.preventDefault();
}

show_login_btn.addEventListener("click", () => {
  login.style.display = "block";
});
close_btn.addEventListener("click", () => {
  login.style.display = "none";
});

login_btn.addEventListener("click", () => {
  userInfo = {
    userName: userName_ipt.value,
    passworld: password_ipt.value,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  message("登陆成功");
  show_login_btn.innerHTML = userInfo.userName;
  login.style.display = "none";
});
register_btn.addEventListener("click", () => {
  console.log(localStorage.getItem("userInfo"));
});
