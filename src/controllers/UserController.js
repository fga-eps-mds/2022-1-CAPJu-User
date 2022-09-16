import User from "../schemas/User.js";
import { UserValidator } from "../validators/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sha256 } from "js-sha256";
import { transformFromAst } from "@babel/core";

class UserController {
  async createUser(req, res) {
    try {
      //cria nome
      const { name, email, password } = await UserValidator.validateAsync(
        req.body
      );
      //ve se o email existe
      const EmailAlreadyExist = await User.findOne({
        email,
      });
      if (EmailAlreadyExist) {
        return res.status(400).json({ message: "Email ja existe!" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //cria novo array de user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      console.log(user);
      if (user) {
        return res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        return res.status(400);
      }
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
      const user = await User.findOne({ email: email.toString() });

      if (user && (await bcrypt.compare(password.toString(), user.password))) {
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

  async requestRecoveryMail(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email: email.toString() });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Nenhum usuário com este e-mail foi encontrado" });
      }

      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        port: 465,
        host: "smtp.gmail.com",
      });

      let date = new Date();
      date.setDate(date.getDate() + 1);

      const hash = sha256(process.env.JWT_SECRET + email + date.getDate());

      let link = "https://capju.vercel.app/recovery/" + hash;

      await User.updateOne(
        { _id: user._id },
        { recoveryHash: hash, recoveryDate: date },
        { upsert: true }
      );

      const mailSent = await transporter.sendMail({
        text:
          "Recuperação de senha \n\n Abra o link abaixo para redefinir a sua senha \n\n " +
          link,
        subject: "Capju Login",
        from: process.env.EMAIL_ADDRESS,
        to: email,
      });

      res.status(200).send({ mailSent });

      // Check for user email
    } catch (error) {
      console.log("error", error);
      return res.status(500);
    }
  }
  async editPassword(req, res) {
    try {
      //const password = req.user.password;
      const { newPassword } = req.body;

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(newPassword, salt);

      //if (password !== hashedPassword) {
      await User.updateOne({ _id: req.params.id }, { password: hashedPassword });
      console.log("sucesso", res);
      res.status(200).send();
      //}
    } catch (error) {
      console.log("error", error);
      return res.status(500).send();
    }
  }

  async updateUser(req, res) {
    try {
      const editEmail = await User.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json(editEmail);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async updatePassword(req, res) {
    try {
      const { hash, newPassword } = req.body;

      const user = await User.findOne({ recoveryHash: hash.toString() });

      if (!user) {
        return res.status(404).json({
          message: "Nenhuma recuperação com esta chave foi encontrada",
        });
      }

      if (user.recoveryDate?.getTime() < new Date().getTime()) {
        return res.status(400).json({
          message: "Link de recuperação expirou",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword.toString(), salt);

      await User.updateOne(
        { _id: user._id },
        { password: hashedPassword },
        { upsert: true }
      );

      res.status(200).send();

      // Check for user email
    } catch (error) {
      console.log("error", error);
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
