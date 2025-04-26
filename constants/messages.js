export const nameValidationMessage = "Name must be between 3 and 50 characters";
export const nameNotEmptyMessage = "Name cannot be empty";
export const nameIsRequiredMessage = "Name is required";

export const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
export const phoneValidationMessage =
  "Phone number must be in the format (XXX) XXX-XXXX";
export const phoneNotEmptyMessage = "Phone cannot be empty";
export const phoneIsRequiredMessage = "Phone is required";

export const emailValidationMessage =
  "Email must be a valid email address like: `name@example.com`";
export const emailNotEmptyMessage = "Email cannot be empty";
export const emailIsRequiredMessage = "Email is required";

export const favoriteValidationMessage =
  "Favorite must be a boolean value: true or false";
export const favoriteIsRequiredMessage = "Favorite is required";

export const passwordEmptyMessage = "Password cannot be empty";
export const passwordIsRequiredMessage = "Password is required";

export const subscriptionOptions = ["starter", "pro", "business"];

export const conflictExistsEmailMessageInUse =
  "Conflict: Another user already uses this email";
export const notFoundMessage = "Not found";

export const loginInvalidMessage = "Email or password is wrong";

export const headerMissingMessage = "Authorization header is missing";
export const bearerMissingMessage = "'Bearer' is missing";
export const userByEmailNotFoundMessage = `User with email: '${email}' not found`;
