const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, fileService, friendService, partyService, ticketGroupService, conversationService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const uploadProfilePicture = catchAsync(async (req, res) => {
  try {
    const fileBody = req.body;
    fileBody.fileType = 'profilePicture';

    const filter = { idUser: req.user.id, fileType: 'profilePicture' };
    const fileObjectResults = await fileService.queryFile(filter, {});
    if (fileObjectResults.totalResults > 0) {
      await fileService.deleteFile(fileObjectResults.results[0].fileName, fileBody, req.user);
    }

    const fileResult = await fileService.uploadFile(fileBody, req.user);
    await fileService.saveImageOnFilesystem(fileBody.base64Image, fileResult);
    await userService.updateUserById(req.user.id, { profilePicture: fileResult.id });
    res.status(httpStatus.NO_CONTENT).send();
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
});

const getProfilePicture = catchAsync(async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (user == undefined) {
      throw new ApiError(404, 'User not found.');
    }
    const fileObjectResults = await fileService.getFileById(user.profilePicture);
    if (fileObjectResults == undefined) {
      throw new ApiError(404, 'File not found.');
    }
    const file = await fileService.downloadFile(fileObjectResults.fileName, req.body, req.user);
    const directory = file.filePath + file.fileName;

    res.download(directory);
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
});

const getLoggedUser = catchAsync(async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
});

const searchByName = catchAsync(async (req, res) => {
  try {
    //const filter = pick(req.query, ['name']);
    const filter = { name: { $regex: req.query.name } };
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    options.paginate = 'profilePicture';

    let results = await userService.queryUsers(filter, options);
    let newResults = [];

    for (let user of results.results) {

      const username = user.name;
      let picture = null;

      if (user.profilePicture != null)
        picture = user.profilePicture;

      const newUserBody = {
        id: user._id,
        name: username,
        picture: picture,
      };
      newResults.push(newUserBody);
    }
    results.results = newResults;

    res.send(results);
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
});

const getUserProfile = catchAsync(async (req, res) => {
  try {
    const reqUser = req.user;
    const user = await userService.getUserById(req.params.userId);
    let responseBody = {};

    if (user == undefined) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const following = await friendService.getNbFollowing(user.id);
    const followers = await friendService.getNbFriend(user.id);
    const upcomingPartys = await ticketGroupService.findPartyFromTicket({ userDetails: user.id, timestamp: { $gte: new Date(Date.now()) } });
    const pastPartys = await ticketGroupService.findPartyFromTicket({ userDetails: user.id, timestamp: { $lte: new Date(Date.now()) } });

    // si on consulte son profil
    if (reqUser.id == user.id) {
      Object.assign(responseBody, { avatar: user.profilePicture.fileName, name: user.name, bio: user.bio, nbFollowers: followers, nbFollowing: following, upcomingParties: upcomingPartys, pastParties: pastPartys });
    } else {
      const idConv = await conversationService.getConversationFeedByUserAndContact(reqUser.id, user.id);
      const isFollow = await friendService.isUserFriend(user.id, reqUser.id);

      Object.assign(responseBody, { avatar: user.profilePicture.fileName, name: user.name, bio: user.bio, nbFollowers: followers, nbFollowing: following, upcomingParties: upcomingPartys, pastParties: pastPartys, isPrivateAccount: user.isPrivateProfile, idFollow: isFollow, idConversation: idConv });
    }

    res.send(responseBody);
  } catch (e) {
    console.log(e);
    res.status(e.statusCode).send(e.message);
  }
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
  getProfilePicture,
  getLoggedUser,
  searchByName,
  getUserProfile,
};
