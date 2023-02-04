const { DataTypes, Model } = require('sequelize')

const seq = require('../db/seq')

// 创建用户模型
const User = seq.define('shop_user', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment:'用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment:'密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment:'是否为管理员，0：不是（默认值）；1：是'
  }
})
// 创建数据表，同步数据表
User.sync()


module.exports=User