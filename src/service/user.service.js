/* 用户服务模块 */

// 引入用户模型，在用户服务模块操作用户模型
const User = require("../model/user.model");
class UserService {
  // 创建用户
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }

  // 根据条件查询用户
  async getUserInfo({ user_name, id }) {
    const whereOpt = {};

    user_name && Object.assign(whereOpt, { user_name });
    id && Object.assign(whereOpt, { id });

    const res = await User.findOne({
      attributes: ["user_name", "id", "is_admin", "password"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  // 根据id修改用户信息
  async updateById(id, { user_name, is_admin, password }) {
    const whereOpt = { id };
    const newUser = {};
    user_name && Object.assign(newUser, { user_name });
    is_admin && Object.assign(newUser, { is_admin });
    password && Object.assign(newUser, { password });
    const res = await User.update(newUser, {
      where: whereOpt,
    });
    return res[0] > 0 ? true : false;
  }
}
module.exports = new UserService();
