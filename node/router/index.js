const express = require("express");
const { read, db } = require("../utils");
const router = express.Router();
const user = require("../manage/user");
const blog = require("../manage/blog");
// 判断用户信息是否存在
router.get("/getPhone", async (req, res) => {
  const phone = req.body;
  const userInfo = await user.getUserByPhone(phone);
  res.send(userInfo);
});

// 获取用户信息
router.get("/user", (req, res) => {
  const sql = "select * from t_user";
  db(sql).then((ress) => {
    res.send(ress);
  });
});
//新增用户
router.get("/addUser", (req, res) => {
  const sql = " insert into t_user set ?";
  const pram = { name: "jeck00000", sex: "M", age: 11, phone: "432432" };
  db(sql, pram).then((result) => {
    res.send(result);
  });
});

// 获取树洞列表信息
router.get("/getHoleList", (req, res) => {
  const sql = "select * from t_hole order by id desc";
  db(sql).then((ress) => {
    res.send({
      status: 0,
      msg: "请求成功",
      data: ress,
    });
  });
});

router.post("/addHole", (req, res) => {
  const sql = " insert into t_hole set ?";
  db(sql, req.body).then((result) => {
    res.send({
      status: 0,
      msg: "请求成功",
      data: result,
    });
  });
});

router.get("/test", (req, res) => {
  console.log(req.body);
  res.send("test");
});

module.exports = router;
