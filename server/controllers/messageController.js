// Archivo donde se gestionan los datos y donde se ejecutan
// los metodos referentes al uso de los datos de los mensages: creacion,
// actualizacion, eliminacion, etc.
const { json } = require("express");
const MessageModel = require("../model/messageModel");
const bcrypt = require("bcrypt");

/**
 * Modulo que gestiona el mensajes y quien lo manda y quien lo recibe y crea el registro en la base de datos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from
    });

    if (data) {
      console.log("Mensaje añadido con exito!! 👌");
      return res.json({ msg: "Message added successfully." });
    } else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    next(err);
  }
};

/**
 * Modulo que llama a la base de datos para retornar todos los mensajes correspondientes filtrando por quien lo recibe y quien lo manda
 * ? Informacion util => $all selecciona los documentos en los que el valor de un campo es una matriz que contiene todos los elementos especificados.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await MessageModel.find({
      users: {
        $all: [from, to]
      }
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      };
    });
    if (projectedMessages) {
      console.log("Mensajes obtenidos con exito!! 👌");
      return res.json(projectedMessages);
    }
  } catch (err) {
    next(err);
  }
};
