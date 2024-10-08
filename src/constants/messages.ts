const errorMessages = {
  userExists: "Business already exists with this Email",
  userNotFound: "Business not found",
  userAccountBlocked:
    "Your account has been blocked, contact Admin for more details",
  unauthorized: "You are unauthorized to access this platform",
  invalidCredentials: "Invalid password",
  emailSendFailed: "Email send failed",
  linkExpired: "The link you are trying to access has expired",
  categoryNotFound: "Category not found with id",
  postNotFount: "Post not found by Id",
  passwordNotMatch: "Old password not match",
  chatNotFount: "Chat not found by this user",
  userAlreadyJoined: "You are already in the group",
  userNotINTheGroup: "User not joined the group",
  roomNotFound: "Room not found",
  domineExists: "Domain already exists",
  domineNotfound: "Domain not found",
  categoryExists: "Category already exists",
  projectNotFound: "Project not found",
  taskNotfound: "Task not found",

  planExists: "Plan already exists",
  planNotFound: "Plan not found",
};

const successMessages = {
  linkSend: "Link successfully send to mail",
  healthOk: "Server is healthy",
};

export { errorMessages, successMessages };
