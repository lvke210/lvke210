const host = "http://127.0.0.1:3000";
// const host = "http://119.3.26.182:3000";
// 获取树洞列表
function getHoleList() {
  fetch(`${host}/api/getHoleList`)
    .then((res) => res.json())
    .then((res) => {
      res.map((item) => {
        let str = "";
        let block;
        str += `
              <div class="flex block-content" >
                <div class="block-right" style="text-align:left;padding-left:30px">${
                  item.content
                }</div>
              </div>
              <div class="block-footer">---${formatDate(new Date(item.create_time))}---</div>
        `;
        block = document.createElement("div");
        block.className = "block";
        block.innerHTML = str;
        holeBox.appendChild(block);
      });
    });
}
getHoleList();
// 新增留言
holebtn.addEventListener("click", async () => {
  const content = textarea.value;
  const time = new Date();
  await fetch(`${host}/api/addHole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, create_time: time }),
  });
  textarea.value = "";
  message();
  holeBox.innerHTML = ""; //先清空列表
  getHoleList(); //再重新请求列表
});
