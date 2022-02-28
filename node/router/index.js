const express = require("express");
const { read, db } = require("../utils");
const router = express.Router();
const user = require("../manage/user");
const blog = require("../manage/blog");
const multer = require("multer");
const path = require("path");
const token = require("../manage/token");

const BASE_URL = "http://lvke210.com"; //线上
// const BASE_URL = "http://localhost:3008"; //开发

//注册
router.post("/register", (req, res) => {
  const { name, password } = req.body;
  const sql = "select * from t_user where name=? limit 1";
  db(sql, name).then((result) => {
    let status = 0;
    let msg = "注册成功";
    if (!result[0]) {
      const sql2 = " insert into t_user set ?";
      db(sql2, req.body).then((result) => {
        console.log(result);
      });
    } else {
      status = 1;
      msg = "用户已存在";
    }
    res.send({
      status,
      msg,
    });
  });
});
//更新
router.post("/update", (req, res) => {
  const { id, avatar } = req.body;
  const sql = `update t_user set avatar="${avatar}" where id=?`;
  db(sql, id).then((result) => {
    console.log(result, "result");
    res.send(result);
  });
});
//登陆
router.post("/login", (req, res) => {
  const { name, password } = req.body;
  const sql = "select * from t_user where name=? limit 1";
  let tokenKey = undefined;
  db(sql, name).then((result) => {
    let status = 0;
    let msg = "请求成功";
    let data = {};
    if (!result[0]) {
      status = 1;
      msg = "还没注册，登个锤儿";
    } else if (password !== result[0].password) {
      status = 1;
      msg = "密码不正确";
    } else {
      tokenKey = token.en(`${result[0].id}`);
      data = result[0];
    }
    res.send({
      status,
      msg,
      tokenKey,
      data,
    });
  });
});

// 判断用户信息是否存在
router.get("/getPhone", async (req, res) => {
  const phone = req.body;
  const userInfo = await user.getUserByPhone(phone);
  res.send(userInfo);
});

// 获取用户信息
// router.get("/user", (req, res) => {
//   const sql = "select * from t_user";
//   db(sql).then((ress) => {
//     res.send(ress);
//   });
// });
router.get("/user", async (req, res) => {
  const userList = await user.getUser();
  res.send(userList);
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
// 获取文章列表信息
router.get("/getArticleList", (req, res) => {
  console.log("获取文章列表信息");
  const sql = "select * from t_article order by id desc";

  db(sql).then((ress) => {
    // res.writeHead(200, {
    //   Expires: new Date("2023-1-1 11:11:11").toUTCString(),
    // });
    res.send({
      status: 0,
      msg: "请求成功",
      data: ress,
    });
  });
});
//新增文章
router.post("/addArticle", (req, res) => {
  const sql = " insert into t_article set ?";
  db(sql, req.body).then((result) => {
    res.send({
      status: 0,
      msg: "请求成功",
      data: result,
    });
  });
});

//新增留言
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

//删除留言
router.get("/delHole", (req, res) => {
  const sql = " delete from t_hole where id=?";
  db(sql, req.query.id).then((result) => {
    res.send({
      status: 0,
      msg: "请求成功",
      data: result,
    });
  });
});

// 上传文件

const storage = multer.diskStorage({
  //文件存储位置
  destination: (req, file, cb) => {
    // cb(null, path.resolve(__dirname, "../uploads"));
    cb(null, path.resolve(__dirname, "../../lvke210/uploads"));
  },
  //文件名
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${Math.ceil(Math.random() * 1000)}.${file.originalname.split(".").pop()}`
    );
  },
});
const uploadCfg = {
  storage: storage,
  limits: {
    //上传文件的大小限制,单位bytes
    fileSize: 1024 * 1024 * 20,
  },
};
router.post("/profile", function (req, res, next) {
  let upload = multer(uploadCfg).any();
  upload(req, res, async (err) => {
    let uploadFile = req.files[0];
    if (err) {
      res.json({ path: `/uploads/` });
      console.log(err, "err");
      return;
    }
    console.log(req.files, "req.files");
    const sql = " insert into files set ?";
    const param = {
      url: `${BASE_URL}/uploads/${req.files[0]?.originalname}`,
      name: req.files[0]?.originalname,
    };
    db(sql, param).then(() => {
      res.send({
        status: 0,
        msg: "请求成功",
        data: param,
      });
    });
    // res.send(req.files);
  });
});
// 获取文件列表信息
router.get("/getFiles", (req, res) => {
  const sql = "select * from files order by id desc";
  db(sql).then((ress) => {
    res.send({
      status: 0,
      msg: "请求成功",
      data: ress,
    });
  });
});

module.exports = router;
