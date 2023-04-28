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
 * @returns un response que usa el metodo json para enviar un mensaje de
 * error y status de error (ejemplo: 404 ERROR), o si todo ha funcionado
 * correctamente un status 200: OK
 */
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck) return res.json({ msg: "Email already used", status: false });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPass
    });
    if (user) {
      console.log("User create successful!! 👌");
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

/**
 * Modulo que gestiona los metodos, comprobaciones, ... de la funcion
 * de registrar al usuario
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns un response que usa el metodo json para enviar un mensaje de
 * error y status de error (ejemplo: 404 ERROR), o si todo ha funcionado
 * correctamente un status 200: OK
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
      console.log("User create successful!! 👌");
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};
