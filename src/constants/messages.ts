const errorMessages = {
  userExists: "Business already exists with this Email",
  userNotFound: "Business not found",
  userAccountBlocked:
    "Your account has been blocked, contact Admin for more details",
  unauthorized: "You are unauthorized to access this platform",
  invalidCredentials: "Invalid password",
  emailSendFailed: "Email send failed",
  linkExpired: "The link you are trying to access has expired",

  planExists: "Plan already exists",
  planNotFound: "Plan not found",
  adminNotFound: "Invalid Email",
  categoryExists: "Category already exists",
  categoryNotFound: "Category not found",
  bannerNOtFound: "Banner not found",
  passwordNotUpdated: "Password not updated ,please try again",
  termsAndConditionsNotFound: "Terms and Conditions not found",
  privacyPolicyNotFound: "Privacy policy not found",
  businessExists: "Business already exists with email",
  bannerCountExceeded: "Banner limit exceeded.",
  bannerDeleteFailed: "Failed to delete banner ,try again",
  termsAndConditionsExists: "Terms & conditions already added",
  paymentNotFound: "Plan not found",
  reviewNotFound: "Review not found",
  planNotValid: "Plan not valid",
  businessExistsInCategory: (businessCount: number, category: string) =>
    `Can't delete ${category}, ${businessCount} active businesses are in the ${category} category`,
  categoryNameExists: (category: string) =>
    `Category already exists with name ${category} `,
  planNameExists: (plan: string) => `Plan already exists with name ${plan}`,
  businessExistsInPlan: (businessCount: number, plan: string) =>
    `Can't delete ${plan}, ${businessCount} active businesses are in the ${plan} plan`,
  paymentNotCompleted: "Your plan expired or checking your payment status",
  freePlanNotDelete: "Can't delete free plan data",
  accountNotFound: (email: string) => `Account not found with email :${email}`,
};

const successMessages = {
  linkSend: "Link successfully send to mail",
  healthOk: "Server is healthy",
  passwordUpdated: "Password updated successfully",
  statusUpdated: "Business status updated successfully",
  deleteSuccess: "Data deleted successfully",
};

export { errorMessages, successMessages };
