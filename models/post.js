import { DataTypes } from "sequelize"
import sequelize from "../utils/db"
import User from "./user"

const Post = sequelize.define("Post", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
})

Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: "userId" })
}

export default Post
