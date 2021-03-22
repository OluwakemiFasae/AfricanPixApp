export default class userCheck {
  static allowUpdate(request, response, userId) {
    if ((request.loggedInUser.id === userId) || (request.loggedInUser.roleId === 1)) {
      return true;
    }
    response.status(403).send({
      message: 'You cannot update someone else\'s photo',
    });
    return false;
  }

  static checkAdmin(request, response) {
    if (request.loggedInUser.roleId !== 1) {
      response.status(403).send({
        message: 'Only admin can do this!!',
      });
      return false;
    }
    return true;
  }
}
