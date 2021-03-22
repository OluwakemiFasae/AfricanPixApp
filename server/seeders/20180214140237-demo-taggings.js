module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Taggings', [{
      tagId: 1,
      photoId: 1
    }, {
      tagId: 1,
      photoId: 2
    }, {
      tagId: 1,
      photoId: 2
    }, {
      tagId: 2,
      photoId: 1
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Taggings', null, {});
  }
};
