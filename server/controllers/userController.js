// Archivo donde se gestionan los datos y donde se ejecutan
// los metodos referentes a la uso de los datos: creacion,
// actualizacion, eliminacion, etc.
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

/**
 * Modulo que gestiona los metodos, comprobaciones, ... de la funcion
 * de registrar al usuario
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) return res.json({ msg: "Usuario ya en uso, prueba otro", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck) return res.json({ msg: "Email ya en uso, prueba otro", status: false });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPass
    });
    if (user) {
      console.log("Usuario creado con exito!! 👌");
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

/**
 * Modulo que gestiona los metodos, comprobaciones, ... de la funcion
 * de logear al usuario
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Usuario o password incorrectos", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Usuario o password incorrectos", status: false });
    }
    if (user) {
      console.log("Usuario logeado con exito!! 👌");
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

/**
 * Modulo que gestiona los metodos, comprobaciones, ... de la funcion
 * de actualizar al usuario con el nuevo avatar seleccionado
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage
    });
    if (userData) {
      console.log("Usuario actualizado con el nuevo avatar con exito!! 👌");
    }
    return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
  } catch (err) {
    next(err);
  }
};
