module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    link: DataTypes.STRING,
    status: DataTypes.ENUM('APPROVED', 'UNAPPROVED')
  });
  Photo.associate = (models) => {
    Photo.hasMany(models.Like, {
      foreignKey: 'photoId',
      as: 'Likes'
    });

    Photo.hasMany(models.Tagging, {
      foreignKey: 'photoId',
      as: 'Tags'
    });

    Photo.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Uploader'
    });
  };

  return Photo;
};
