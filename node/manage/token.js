const jwt = require("jsonwebtoken");

token = {
  en(str) {
    //加密
    let tokenKey = jwt.sign(str, "apache");
    return tokenKey;
  },

  de(token) {
    try {
      let tokenKey = jwt.verify(token, "apache");
      return {
        status: "success",
        tokenKey,
      };
    } catch {
      return {
        status: "faile",
      };
    }
  },
};

module.exports = token;
