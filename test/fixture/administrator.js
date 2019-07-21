'use strict';

module.exports = function (models) {
  return models.Administrator.bulkCreate([
    {
      id: 1,
      username: 'admin',
      password: 'password',
    },
    {
      id: 2,
      username: 'loremipsumjp',
      password: 'qwerty',
    },
  ])
}
