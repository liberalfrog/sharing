'use strict';

module.exports = function (sequelize, DataTypes) {
  var Administrator = sequelize.define('Administrator', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  })

  return Administrator
}
