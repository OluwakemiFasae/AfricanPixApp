module.exports = (sequelize, DataTypes) => {
  const Tagging = sequelize.define('Tagging', {
    tagId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  });
  Tagging.associate = (models) => {
    Tagging.belongsTo(models.Tag, {
      foreignKey: 'tagId',
    });
    Tagging.belongsTo(models.Photo, {
      foreignKey: 'PhotoId',
    });
  };
  return Tagging;
};
