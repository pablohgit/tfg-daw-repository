const mongoose = require("mongoose");

/** Modelo del usuario, se podria asociar a una interfaz, lo que pasa
 * es que en este caso tambien usamos la libreria de mongoose lo que hace
 * que tambien lo genere como modelo de la base de datos
 */
const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true }
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
