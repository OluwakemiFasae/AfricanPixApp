import checkAdmin from '../controllers/adminFunc';

const User = require('../models').User;
const Photo = require('../models').Photo;
const Like = require('../models').Like;
const Tagging = require('../models').Tagging;
const Tag = require('../models').Tag;


export default class photoController {
  static upload(request, response) {
    // check for photo url if it exists
    Photo.find({
      where: ''
    });
    return Photo
      .create({
        title: request.body.title,
        description: request.body.description,
        userId: request.loggedInUser.id,
        link: request.url,
        status: 'UNAPPROVED'
      })
      .then((newPix) => {
        response.status(200).send({
          message: 'successful',
          pix: newPix
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static download(request, response) {
    const photoId = parseInt(request.params.id);
    Photo
      .findById(photoId, {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        },
      })
      .then((photo) => {
        return response.status(200).send({
          message: 'successful',
          url: photo.link
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static allPhotos(request, response) {
    Photo.findAll({
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
        if (photos.length > 0) {
          response.status(200).json({
            status: 'Successful',
            data: photos
          });
        } else {
          response.status(200).json({
            status: 'Successful Access',
            message: 'but no photos yet'
          });
        }
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static onePhoto(request, response) {
    const photoId = parseInt(request.params.id);
    return Photo
      .findById(photoId, {
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
      .then((photo) => {
        return response.status(200).send(photo);
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static approvePhoto(request, response) {
    const photoId = parseInt(request.params.id);
    Photo
      .findById(photoId)
      .then((photo) => {
        if (photo) {
          if (checkAdmin) {
            return Photo
              .update({
                status: 'APPROVED'
              })
              .then((approvedPix) => {
                response.status(200).send({
                  message: 'Pix approved',
                  pix: approvedPix
                });
              })
              .catch(error => response.status(500).send(error.toString()));
          }
        }
        response.status(404).json({
          status: 'Unsuccessful',
          message: 'Pix not found',
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static unapprovePhoto(request, response) {
    const photoId = parseInt(request.params.id);
    Photo
      .findById(photoId)
      .then((photo) => {
        if (photo) {
          if (checkAdmin) {
            return Photo
              .update({
                deletedAt: Date.now
              })
              .then((unapprovedPix) => {
                response.status(200).send({
                  message: 'Pix removed',
                  pix: unapprovedPix
                });
              })
              .catch(error => response.status(500).send(error.toString()));
          }
        }
        response.status(404).json({
          status: 'Unsuccessful',
          message: 'Pix not found',
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static deletePhoto(request, response) {
    const photoId = parseInt(request.params.id);
    Photo
      .findById(photoId)
      .then((photo) => {
        if (photo) {
          if (checkAdmin) {
            return Photo
              .destroy()
              .then((deletedPix) => {
                response.status(200).send({
                  message: 'Pix successfully deleted',
                  pix: deletedPix
                });
              })
              .catch(error => response.status(500).send(error.toString()));
          }
        }
        response.status(404).json({
          status: 'Unsuccessful',
          message: 'Pix not found',
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }
}
