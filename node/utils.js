/*
 * @Description:
 * @Author: owen
 * @Date: 2021-10-20 17:33:21
 * @LastEditTime: 2021-10-21 11:45:09
 */

const fs = require("fs");

const mysql = require("mysql");

const read = (url) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(url, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        console.log(err);
        rejects(err);
      }
    });
  });
};

const config = {
  host: "119.3.26.182",
  database: "blog",
  user: "blog",
  password: "000000",
  port: "3306",
};

const poll = mysql.createPool(config);

const db = (sql, sqlParams = null) => {
  return new Promise((resolve, reject) => {
    poll.getConnection((err, conn) => {
      if (!err) {
        conn.query(sql, sqlParams, (e, results) => {
          if (!e) {
            resolve(results);
            conn.destroy();
          } else {
            reject(e);
          }
        });
      } else {
        reject(err);
        console.log("err", err);
      }
    });
  });
};

module.exports = {
  read,
  db,
};
