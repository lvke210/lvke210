var canvas;
//= document.getElementById('cw');
var ctx;
var u = 10;
const m = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
window.onmousemove = function (e) {
  m.x = e.clientX;
  m.y = e.clientY;
};

//获取颜色
function gc() {
  const s = "0123456789ABCDEF";
  let ctx = "#";
  for (let i = 0; i < 6; i++) {
    ctx += s[Math.ceil(Math.random() * 15)];
  }
  return ctx;
}
const a = [];
window.onload = function myfunction() {
  canvas = document.getElementById("cw");
  ctx = canvas.getContext("2d");
  for (var i = 0; i < 10; i++) {
    var r = 10;
    var x = Math.random() * (innerWidth - 2 * r) + r;
    var y = Math.random() * (innerHeight - 2 * r) + r;
    var t = new ob(innerWidth / 2, innerHeight / 2, 5, "red", Math.random() * 200 + 20, 2);
    a.push(t);
  }

  ctx.lineWidth = "2";
  ctx.globalAlpha = 0.5;
  resize();
  anim();
};
window.onresize = function () {
  resize();
};
function resize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  for (var i = 0; i < 100; i++) {
    a[i] = new ob(innerWidth / 2, innerHeight / 2, 1, gc(), Math.random() * 200 + 20, 0.02);
    //                  x               y          r/px  cc/color  o                   s
  }
}
function ob(x, y, r, cc, o, s) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.cc = cc;
  this.theta = Math.random() * Math.PI * 2;
  this.s = s;
  this.o = o;
  this.t = Math.random() * 50;
  this.dr = function () {
    const ls = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.s;
    this.x = m.x + Math.cos(this.theta) * this.t;
    this.y = m.y + Math.sin(this.theta) * this.t;
    ctx.beginPath();
    ctx.lineWidth = this.r;
    ctx.strokeStyle = this.cc;
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  };
}
function anim() {
  requestAnimationFrame(anim);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  a.forEach(function (e) {
    e.dr();
  });
}
