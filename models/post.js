// models/post.js
export default (sequelize, DataTypes) => {
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
      allowNull: false,
    },
  })

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: "userId" })
  }

  return Post
}
