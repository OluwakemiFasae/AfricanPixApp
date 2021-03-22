
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tags', [{
      tagName: 'Nature',
    }, {
      tagName: 'Food'
    }, {
      tagName: 'Grills'
    }, {
      tagName: 'Feeds'
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
