/*
 * @Description:
 * @Author: owen
 * @Date: 2021-10-20 17:05:04
 * @LastEditTime: 2021-10-21 15:47:19
 */
const express = require("express");
const { read, db } = require("./utils");
const app = express();
var bodyParser = require("body-parser");
//静态资源
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});
app.use("/static", express.static(__dirname + "/static"));
var server = require("http").createServer(app);
app.use(bodyParser.json({ limit: "1mb" }));
const user = require("./manage/user");
const blog = require("./manage/blog");
app.use(
  bodyParser.urlencoded({
    //此项必须在 bodyParser.json 下面,为参数编码
    extended: true,
  })
);
// 首页
// app.get("/",(req,res)=>{
//   read("pages/index.html").then((resp)=>{
//     res.end(resp)
//   })
// })
// ----------------------------------------业务----------------------------------------------

// 判断用户信息是否存在
app.get("/api/getPhone", async (req, res) => {
  const userInfo = await user.getUserByPhone("32432432");
  res.send(userInfo);
});

// 获取用户信息
app.get("/user", (req, res) => {
  const sql = "select * from t_user";
  db(sql).then((ress) => {
    res.send(ress);
  });
});
//新增用户
app.get("/addUser", (req, res) => {
  const sql = " insert into t_user set ?";
  const pram = { name: "jeck00000", sex: "M", age: 11, phone: "432432" };
  db(sql, pram).then((result) => {
    res.send(result);
  });
});

//监听服务端端口
app.listen(3000, () => {
  console.log("server is start at: 127.0.0.1:3000");
});

// 获取树洞列表信息
app.get("/api/getHoleList", (req, res) => {
  const sql = "select * from t_hole order by id desc";
  db(sql).then((ress) => {
    res.send(ress);
  });
});

app.post("/api/addHole", (req, res, next) => {
  const sql = " insert into t_hole set ?";
  db(sql, req.body).then((result) => {
    res.send(result);
  });
});
