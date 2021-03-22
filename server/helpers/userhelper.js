export default class userCheck {
  static paginate(request, response, object) {
    const totalCount = object.length;
    let pageCount = Math.round(totalCount / (request.query.limit || 10));
    pageCount = (pageCount < 1 && totalCount > 0) ? 1 : pageCount;
    const page = Math.round((request.query.offset || 0) /
    (request.query.limit || 10)) + 1;
    response.status(200).send({
      object,
      metaData: {
        page,
        pageCount,
        count: object.length,
        totalCount,
      }
    });
  }

  static allowUpdate(request, response, userId, newBody) {
    if ((request.loggedInUser.id === userId) || (request.loggedInUser.roleId === 1)) {
      return true;
    }
    if ((request.loggedInUser.roleId !== 1 && newBody.roleId) ||
      (request.loggedInUser.id === userId && details.roleId !== undefined)) {
      response.status(403).send({
        message: 'Sorry you can\'t change your role',
      });
      return false;
    }
    response.status(403).send({
      message: 'You cannot update someone else\'s details',
    });
    return false;
  }

  static allowDelete(request, response, userId) {
    if (request.loggedInUser.roleId !== 1) {
      response.status(403).send({
        message: 'Only admin can delete someone\'s details',
      });
      return false;
    }
    if (request.loggedInUser.id === userId) {
      response.status(403).send({
        message: 'You cannot delete yourself!!!',
      });
      return false;
    }
    return true;
  }

  static list(request, response) {
    if (request.loggedInUser.roleId !== 1) {
      response.status(403).send({
        message: 'Only admin can see all users\' details',
      });
      return false;
    }
    return true;
  }
}
