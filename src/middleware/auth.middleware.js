/* 
  用户token验证中间件 
*/

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");

const {
  tokenExpiredError,
  jsonWebTokenError,
  tokenVerifyError,
  notFoundToken,
  hasNotAdminPermission,
} = require("../constant/err.type");

// 验证是否携带token，token是否有效
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  // console.log(authorization)
  if (!authorization) {
    console.error("未携带token，重新登陆");
    ctx.app.emit("error", notFoundToken, ctx);
    return;
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        console.error("token已过期", error);
        ctx.app.emit("error", tokenExpiredError, ctx);
        break;
      case "JsonWebTokenError":
        console.error("无效的token", error);
        ctx.app.emit("error", jsonWebTokenError, ctx);
        break;
      default:
        console.error("token验证出现错误", error);
        ctx.app.emit("error", tokenVerifyError, ctx);
        break;
    }
    return;
  }
  await next();
};

// 判断是否有管理员权限
const hasAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    console.error("没有管理权限");
    ctx.app.emit("error", hasNotAdminPermission, ctx);
    return;
  }
  await next();
};
module.exports = { auth, hasAdminPermission };
