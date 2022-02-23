/*
 * @Description:
 * @Author: owen
 * @Date: 2021-10-20 17:05:04
 * @LastEditTime: 2021-10-21 15:47:19
 */
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
//配置全局中间件 设置请求头 允许跨域
app.all("*", function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  // );
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By", " 3.2.1");
  res.header("cache-control", "max-age=10");
  // res.header("Expires", new Date("2023-1-1 11:11:11").toUTCString());
  if (req.method == "OPTIONS") res.sendStatus(200);
  /*让options请求快速返回*/ else next();
});
//外部中间件解决跨域
const cors = require("cors");
app.use(cors());

//静态资源
app.use("/static", express.static(__dirname + "/static"));
app.use("/uploads", express.static(__dirname + "/uploads"));

//  应该是配置全局中间件 解析json格式数据
app.use(express.json()); // 这个是express内置中间件
app.use(express.urlencoded({ extended: false })); //express内中中间件 解析URL中的参数
//下面的是外部的中间件
// app.use(bodyParser.json({ limit: "1mb" }));
// app.use(
//   bodyParser.urlencoded({
//     //此项必须在 bodyParser.json 下面,为参数编码
//     extended: true,
//   })
// );

//除了错误中间件 其他中间件需要在路由之前配置

// 挂载路由
const router = require("./router");
app.use("/api", router);

// 配置全局错误中间件 捕获错误防止项目崩溃
app.use((err, req, res, next) => {
  console.log(err.message);
  res.send({
    status: 1,
    msg: "Error" + err.message,
  });
});
//监听服务端端口
app.listen(3008, () => {
  console.log("server is start at: 127.0.0.1:3008");
});
