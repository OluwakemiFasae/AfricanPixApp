import UserController from './controllers/user';
import PhotoController from './controllers/photo';
import authorize from './middlewares/authorize';

const Route = (app) => {
  // Endpoints for users
  app.post('/api/v1/users/login', UserController.login);
  app.post('/api/v1/users/signUp', UserController.create);

  app.get('/api/v1/users', authorize, UserController.listUsers);
  app.get('/api/v1/users/:id', UserController.getUser);

  app.get('/api/v1/users/:id/photos', UserController.getUserPhotos);

  app.put('/api/v1/users/:id', authorize, UserController.updateUser);
  app.delete('/api/v1/users/:id', authorize, UserController.deleteUser);


  // Endpoints for photos
  app.post('/api/v1/photos', authorize, PhotoController.upload);
  app.get('/api/v1/photos/:id/downloadPhoto', PhotoController.download);

  app.get('/api/v1/photos', PhotoController.allPhotos);
  app.get('/api/v1/photos/:id', PhotoController.onePhoto);

  app.post('/api/v1/photos/:id/approve', authorize, PhotoController.approvePhoto);
  app.post('/api/v1/photos/:id/unapprove', authorize, PhotoController.unapprovePhoto);

  app.delete('/api/v1/photos/:id', authorize, PhotoController.deletePhoto);
};
export default Route;
