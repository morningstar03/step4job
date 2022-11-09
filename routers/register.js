const registerData = require("../app/controllers/userRegisterationController");

module.exports = (register, jwt) => {
  // register.get('/register/:userId', jwt, registerData.getUserRegisterData)

  register.get("/register/:userId", registerData.getUserRegisterData);
  register.post("/register", registerData.addUserRegistrationData);
};
