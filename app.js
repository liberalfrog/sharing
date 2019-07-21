import * as Sequelize from 'sequelize';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});
