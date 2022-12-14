import jwt from "jsonwebtoken";
import User from "../schemas/User.js";


async function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user.accepted === false) {
        throw new Error();
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send();
    }
  }

  if (!token) {
    return res.status(401).send();
  }
}


export const authRole = (roleArray) => (req, res, next) => {
  function searchRole(value) {
    return value == req.user.role;
  }
  let filtered = roleArray.filter(searchRole);
  if (req.user.role == filtered) {
    return next();
  } else if ((req.url.match('accepted') != null) 
  || (req.url.match('acceptRequest') != null) 
  || (req.url.match('deleteRequest') != null)){
    if ((req.user.unityAdmin != undefined) ||(req.user.unityAdmin != null)){
      console.log(req.user.unityAdmin);
      return next();
    }
  }
  return res
    .status(401)
    .json({ sucess: false, message: "Acesso Negado: Perfil sem permissão" });
};

export { protect };
