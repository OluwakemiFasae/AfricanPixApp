module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagName: DataTypes.STRING
  });
  Tag.associate = (models) => {
    Tag.hasMany(models.Tagging, {
      foreignKey: 'tagId',
    });
  };
  return Tag;
};
