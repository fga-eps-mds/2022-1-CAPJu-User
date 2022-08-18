import User from "../schemas/User.js";
import { UserValidator } from "../validators/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async createUser(req, res) {
    try {
      //cria nome
      const { name, email, password } = await UserValidator.validateAsync(
        req.body
      );
      //ve se o nome existe
      const UserAlreadyExist = await User.findOne({
        name,
      });
      if (UserAlreadyExist) {
        return res.status(400).json({ message: "user already exist!" });
      }
      //ve se o email existe
      const EmailAlreadyExist = await User.findOne({
        email,
      });
      if (EmailAlreadyExist) {
        return res.status(400).json({ message: "email already exist!" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //cria novo array de user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      if (user) {
        res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
      // printa todo mundo
      console.log(user);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  async allUser(req, res) {
    try {
      const user = await User.find();
      return res.status(200).json({
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async user(req, res) {
    try {
      const user = await User.findOne({ name: req.body.name });
      return res.status(200).json({
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      // Check for user email
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        return res.status(400).json({ message: "senha invalida" });
      }
    } catch (error) {
      return res.status(500);
    }
  }
}
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
export default new UserController();
