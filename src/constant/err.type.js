/* 
  错误类型
*/
module.exports = {
  userFormatError: {
      code: '10001',
      message: '用户名或密码为空',
      result:''
  },
  userAlreadyExited:{
    code: '10002',
    message: '用户名已存在',
    result:''
  },
  userRegisterError: {
    code: '10003',
    message: '注册出现错误，请稍后再试',
    result:""
  }
}