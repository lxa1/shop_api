/* 
  地址数据操作模块
*/
const Address = require("../model/address.model");
const { Op } = require("sequelize");

class AddressService {

  //添加地址
  async addAddress(user_id, params) {
    return await Address.create({ user_id, ...params });
  }



  //获取地址列表 
  async getAddressList(user_id) {
    return Address.findAll({
      attributes: ["id", "consignee", "phone", "address", "is_default"],
      where: {
        user_id,
      },
    });
  }


  // 通过id和user_id查找符合条件的数据个数
  async getAddressCount(id, user_id) {
    return await Address.count({
      where: {
        [Op.and]: [{ id }, { user_id }],
      },
    });
  }

  //更新地址信息
  async updateAddress(id, params) {
    return await Address.update(params, {
      where: {
        id,
      },
    });
  }


  //删除地址
  async removeAddress(id) {
    return await Address.destroy({
      where: {
        id,
      }
    })
  }
}
module.exports = new AddressService();
