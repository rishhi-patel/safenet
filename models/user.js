export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: "userId" })
  }

  return User
}
