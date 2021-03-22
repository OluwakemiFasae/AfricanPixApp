import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
// import mailgun from 'mailgun-js';
import userCheck from '../helpers/userhelper';

// const mailgun = require("mailgun-js");
// const apiKey = 'key-cedaf1249babd064e509bf5919fe49e0';
// const DOMAIN = 'https://app.mailgun.com/app/domains/sandbox06916cda13094140936d7e6ec374595b.mailgun.org';
// mailgun = require('mailgun-js')({ apiKey, domain: DOMAIN });

require('dotenv').config();

const User = require('../models').User;
const Photo = require('../models').Photo;
const Like = require('../models').Like;
const Tagging = require('../models').Tagging;


const userRules = {
  firstname: 'required|between:3,20',
  lsastname: 'required|between:3,25',
  username: 'required|between:6,15',
  email: 'required|email',
  password: 'required|min:8',
  isAdmin: 'required|integer'
};
const loginRules = {
  email: 'required|email',
  password: 'required|min:8',
};

const saltRounds = 10;


export default class UserController {
  static create(request, response) {
    User
      .findOne({
        where: {
          email: request.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          const validate = new Validator(request.body, userRules);
          if (validate.passes()) {
            bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
              return User
                .create({
                  firstName: request.body.firstName,
                  lastName: request.body.lastName,
                  email: request.body.email,
                  username: request.body.username,
                  twitter: request.body.twitter,
                  instagram: request.body.instagram,
                  website: request.body.website,
                  avatar: request.body.avatar,
                  password: hash,
                  roleId: 2,
                })
                .then((createdUser) => {
                  // const randomKey = 'new Date() + Math.random().toString(36).slice(2)';
                  // const url = `domain/users/userId/${randomKey}`;
                  // const data = {
                  //   from: 'Excited User <me@samples.mailgun.org>',
                  //   to: createdUser.email,
                  //   subject: 'Activate Account',
                  //   text: `Please click on the following link to get activated \n ${url}`
                  // };

                  // mailgun.messages().send(data, (error, body) => {
                  //   console.log(body);
                  // });

                  delete createdUser.dataValues.password;
                  response.status(201).send({
                    status: 'Successful',
                    data: createdUser,
                  });
                })
                .catch(error => response.send({
                  status: 'Success',
                  error: error.toString(),
                }));
            });
          } else {
            return response.status(400).json({
              status: 'Unsuccessful',
              message: 'Invalid data input',
              errors: validate.errors.all(),
            });
          }
        }
        return response.status(400).send({
          status: 'Found',
          message: 'User already exists!'
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  /**
 *
 *
 * @static
 * @param {any} request
 * @param {any} response
 * @returns
 * @memberof UserController
 */
  static login(request, response) {
    const validate = new Validator(request.body, loginRules);
    if (validate.passes()) {
      return User
        .find({
          where: {
            email: request.body.email
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
        })
        .then((user) => {
          if (user) {
            bcrypt.compare(
              request.body.password,
              user.dataValues.password, (err, resp) => {
                if (resp === false) {
                  return response.status(401).send({
                    message: 'Wrong Password',
                  });
                }
                const token = jwt.sign(
                  {
                    id: user.dataValues.id,
                    email: user.dataValues.email,
                    roleId: user.dataValues.roleId
                  },
                  process.env.JWT_SECRET, { expiresIn: 60 * 60 }
                );
                delete user.dataValues.password;
                return response.status(200).send({
                  message: 'login successful', user, token
                });
              }
            );
          } else {
            return response.status(404).json({
              status: 'Unsuccessful',
              message: 'User not found',
            });
          }
        })
        .catch(error => response.status(500).send(error.toString()));
    } response.status(400).json({
      status: 'Unsuccessful',
      message: 'Invalid data input',
      errors: validate.errors.all(),
    });
  }
  /**
 *
 *
 * @static
 * @param {any} request
 * @param {any} response
 * @memberof UserController
 */
  static listUsers(request, response) {
    User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
      },
    })
      .then((result) => {
        if (userCheck.list(request, response)) {
          if (result.length > 0) {
            response.status(200).json({
              status: 'Successful',
              data: result
            });
          } else {
            response.status(200).json({
              status: 'Successful Access',
              message: 'but no user yet'
            });
          }
        }
      })
      .catch(error => response.status(500).send(error.toString()));
  }
  /**
 *
 *
 * @static
 * @param {any} request
 * @param {any} response
 * @returns
 * @memberof UserController
 */
  static getUser(request, response) {
    const userId = parseInt(request.params.id);
    return User
      .findById(userId, {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
        },
      })
      .then((user) => {
        return response.status(200).send(user);
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static getUserPhotos(request, response) {
    const userId = parseInt(request.params.id);
    Photo
      .findAll({
        where: {
          userId
        },
        include: [{
          model: User,
          as: 'Uploader',
          attributes: ['firstname', 'lastname']
        },
        {
          model: Like,
          as: 'Likes',
          include: [{
            model: User,
            attributes: ['firstname', 'lastname']
          }],
          attributes: ['id'],
        },
        {
          model: Tagging,
          as: 'Tags',
          include: [{
            model: Tag,
            attributes: ['tagName']
          }],
          attributes: ['id'],
        }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        },
      })
      .then((photos) => {
        response.status(200).send({
          data: photos,
          message: 'successful'
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static updateUser(request, response) {
    const userId = parseInt(request.params.id);
    User
      .findById(userId)
      .then((user) => {
        if (user) {
          if (userCheck.allowUpdate(request, response, userId, request.body)) {
            bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
              let message = '';
              if (request.body.email !== undefined) {
                if (request.body.email === user.email) {
                  message += 'Email up to date. ';
                } else {
                  message += 'Email successfully Updated. ';
                }
              }
              bcrypt.compare(
                request.body.password,
                user.password, (err, resp) => {
                  if (request.body.email !== undefined) {
                    if (resp === true) {
                      message += 'Password up to date. ';
                    } else {
                      message += 'Password successfully Updated. ';
                    }
                  }
                }
              );
              return user
                .update({
                  firstName: request.body.firstName || user.firstName,
                  lastName: request.body.lastName || user.lastName,
                  email: request.body.email || user.email,
                  username: request.body.username || user.username,
                  twitter: request.body.twitter || user.twitter,
                  instagram: request.body.instagram || user.instagram,
                  website: request.body.website || user.website,
                  avatar: request.body.avatar || user.avatar,
                  password: hash || user.password,
                  roleId: 2 || user.roleId
                })
                .then((updatedUser) => {
                  delete updatedUser.dataValues.password;
                  response.status(200).send({
                    updatedUser, message
                  });
                })
                .catch(error => response.status(500).send(error.toString()));
            });
          }
        } else {
          response.status(404).json({
            status: 'Unsuccessful',
            message: 'User not found',
          });
        }
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static deleteUser(request, response) {
    const userId = parseInt(request.params.id);
    User
      .findById(userId)
      .then((user) => {
        if (user) {
          if (userCheck.allowDelete(request, response, userId)) {
            return user
              .destroy()
              .then(() => response.status(200).send({
                message: `${user.firstName} has been deleted`
              }))
              .catch(err => response.status(500).send(err.toString()));
          }
          response.status(404).json({
            status: 'Unsuccessful',
            message: 'User doesn\'t exist',
          });
        }
      })
      .catch(error => response.status(500).send(error.toString()));
  }
}
