const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Oluwakemi',
      lastName: 'Fasae',
      email: 'kemifasae@gmail.com',
      username: 'khemmyhef',
      twitter: 'kayfash',
      instagram: 'kaykayfash',
      website: 'kayyou.com',
      avatar: 'dunno',
      password: bcrypt.hashSync('password1', saltRounds),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }, {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      username: 'admin',
      twitter: 'admin',
      instagram: 'admin',
      website: 'admin.com',
      avatar: 'admin',
      password: bcrypt.hashSync('password', saltRounds),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }, {
      firstName: 'Nwakaego',
      lastName: 'Nzeteh',
      email: 'ego@gmail.com',
      username: 'Nwaka-ego',
      twitter: 'ego-zeteh',
      instagram: 'ego-zeteh',
      website: 'zeteh.com',
      avatar: 'nwaka',
      password: bcrypt.hashSync('passwordego', saltRounds),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
