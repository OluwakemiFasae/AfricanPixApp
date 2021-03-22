module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    twitter: DataTypes.STRING,
    instagram: DataTypes.STRING,
    website: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  });
  User.associate = (models) => {
    User.hasMany(models.Photo, {
      foreignKey: 'userId',
    });

    User.hasMany(models.Like, {
      foreignKey: 'userId',
    });

    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
    });
  };
  return User;
};
