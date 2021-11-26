const {db} = require("../utils")

module.exports={
  //根据手机号获取用户
async getUserByPhone(phone){
    const sql = "select * from t_user where phone = ?"
    return  await db(sql,[phone])
  },
  //添加用户信息
 async addUser(user){
    const sql = " insert into t_user set ?"
    return await db.apply(sql,user)
  },

  //更新用户信息
 async update(arr){
   const sql = "update t_user set ? where id=?"
   return await db(sql,arr)
 },

  //删除用户信息(伪删除)
  delete(id){this.update([{del:1},id])},

  //查询用户信息
 async getUser(){
   const sql = "select * from t_user where del = 0"
   return await db(sql)
 },
}