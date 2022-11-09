const jwt = require("../app/middlewares/auth.jwt");
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

module.exports = (app, express) => {
  const register = express.Router();
  app.use("/", register);
  require("./register")(register, jwt);

  const login = express.Router();
  app.use("/", login);
  require("./login")(login, jwt);
};
