
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Photos', [{
      title: 'Landscape Beauty',
      description: 'A show of the beauty of Naturals',
      userId: 1,
      link: 'www.pixlink.com/photo1',
      status: 'APPROVED'
    }, {
      title: 'Landscape Beauty 2',
      description: 'A show of the beauty of Naturals 2',
      userId: 2,
      link: 'www.pixlink.com/photo2',
      status: 'APPROVED'
    }, {
      title: 'Landscape Beauty 3',
      description: 'A show of the beauty of Naturals 3',
      userId: 1,
      link: 'www.pixlink.com/photo4',
      status: 'APPROVED'
    }, {
      title: 'Landscape Beauty 4',
      description: 'A show of the beauty of Naturals 4',
      userId: 2,
      link: 'www.pixlink.com/photo4',
      status: 'APPROVED'
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
