// utils/db.js
import { Sequelize } from "sequelize"
import dbConfig from "../config/config.json"
import mysql2 from "mysql2"

const env = process.env.NODE_ENV || "development"
const config = dbConfig[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectModule: mysql2,
  }
)

export default sequelize
