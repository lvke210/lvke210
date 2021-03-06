// 模仿 message 弹窗
export function message(msg = "操作成功") {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = msg;
  document.body.appendChild(div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, 5000);
}

// 原生js时间格式化
export const formatDate = function formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  });
  return fmt;
};
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
