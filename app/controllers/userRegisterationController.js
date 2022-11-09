const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

module.exports = {
  getUserRegisterData: async (req, res, next) => {
    try {
      const id = req.params.userId;
      console.log(id);
      const userData = await prisma.users.findUnique({
        where: { id },
        include: {
          profileStage: true,
        },
      });
      console.log(userData);
      res.send(userData);
    } catch (error) {
      res
        .status(500)
        .json({ title: "internal server error", err: error.message });
    }
  },

  addUserRegistrationData: async (req, res, next) => {
    const {
      username,
      mobile,
      email,
      password,
      confirmPassword,
      userPreference,
    } = req.body;
    const user = await prisma.users.findUnique({
      where: { mobile },
    });
    if (user)
      return res.status(400).json({
        title: "error occured",
        msg: "you already have a step4job account with this mobile number",
      });
    if (!(username && mobile && email && password && confirmPassword)) {
      return res.status(400).json({
        title: "error occured",
        msg: "please fill all the input fields",
      });
    }
    if (!(password === confirmPassword)) {
      return res
        .status(400)
        .json({ title: "error occured", msg: "password is not matching" });
    }
    try {
      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await prisma.users.create({
        data: {
          username,
          mobile,
          email,
          password: hashedPassword,
        },
      });
      const { username, mobile, email, createdAt } = user;
      res.send({ username, mobile, email, createdAt });
    } catch (error) {
      return res.status(500).json({ title: "error occured", msg: error });
    }
  },

  updateUserRegisterData: async (req, res, next) => {
    try {
      const id = req.params.userId;
      const data = req.body;
      const update = await prisma.users.update({
        where: { id },
        data,
      });
      res.send(userData);
    } catch (error) {
      res
        .status(500)
        .json({ title: "internal server error", err: error.message });
    }
  },
};
