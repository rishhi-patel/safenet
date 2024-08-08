import User from "./user"
import Post from "./post"
import sequelize from "../utils/db"
import { Sequelize } from "sequelize"

const db = {}

// Initialize models and add them to the `db` object
db.User = User(sequelize, Sequelize.DataTypes)
db.Post = Post(sequelize, Sequelize.DataTypes)

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
