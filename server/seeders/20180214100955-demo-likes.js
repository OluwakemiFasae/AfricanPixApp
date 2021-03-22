
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Likes', [{
      userId: 1,
      photoId: 1
    },
    {
      userId: 2,
      photoId: 1
    },
    {
      userId: 1,
      photoId: 2
    },
    {
      userId: 1,
      photoId: 1
    },
    {
      userId: 2,
      photoId: 2
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
