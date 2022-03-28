const roles = ['user', 'organizer', 'admin'];

const roleRights = new Map();

const baseRoles = ['getParty', 'manageMessage', 'getMessage', 'getNewsFeedByPartyId', 'getNewsFeedById', 'createQrCode', 'getQrCodeByUser', 'getQrCodeByParty', 'getQrCodeById',
  'uploadFile', 'downloadFile', 'deleteFile', 'getNewsFeedByGeographicalPosition', 'createTicketGroup', 'getTicketGroup', 'setTicketGroupRead', 'getCompletedTicketGroup', 'getHomePage', 'getTicketGroupRendering',
  'getTicketGroupNotification', 'listUserFiles', 'listPartyFiles', 'addFriend', 'getFriendList', 'removeFriend', 'upload-profile-picture', 'get-profile-picture', 'getListConversation', 'createConversation',
  'getConversationMessages', 'addMessageToConversation', 'deleteConversation', 'addUsersToConversation', 'removeUsersFromConversation', 'uploadConversationPicture', 'downloadConversationPicture', 'getLoggedUser', 'getTicketDetailQrCode',
  'getFileParty', 'getFriendParty', 'searchUsers', 'getTrendings', 'createCategory'];
const organizersRoles = ['manageParty', 'manageNewsFeed', 'verifyQrCode', 'verifyQrCodeManual', 'getUserParty', 'manageTicketTemplate'];
const adminRoles = ['getUsers', 'manageUsers'];

roleRights.set(roles[0], baseRoles);
roleRights.set(roles[1], baseRoles + organizersRoles);
roleRights.set(roles[2], baseRoles + organizersRoles + adminRoles);

module.exports = {
  roles,
  roleRights,
};
