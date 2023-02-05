/* 
  错误处理
 */

module.exports = (err, ctx) => {
  let status = 500;

  if (["10001", "10201", "10202"].includes(err.code)) {
    status = 400;
  } else if (["10002", "10004", "10005", "10008"].includes(err.code)) {
    status = 409;
    // 客户端发送信息不正确
  } else if (["10101", "10102", "10103", "10104"].includes(err.code)) {
    status = 401;
    // token不正确
  } else if (["10105"].includes(err.code)) {
    status = 403;
    //没有权限
  }
  ctx.status = status;
  ctx.body = err;
};
