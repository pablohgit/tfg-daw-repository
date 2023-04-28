const mongoose = require("mongoose");

/** Modelo del usuario, se podria asociar a una interfaz, lo que pasa
 * es que en este caso tambien usamos la libreria de mongoose lo que hace
 * que tambien lo genere como modelo de la base de datos
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    require: true,
    max: 50
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 20
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false
  },
  avatarImage: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Users", userSchema);
