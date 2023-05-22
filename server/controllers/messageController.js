// Archivo donde se gestionan los datos y donde se ejecutan
// los metodos referentes al uso de los datos de los mensages: creacion,
// actualizacion, eliminacion, etc.
const { json } = require("express");
const MessageModel = require("../model/messageModel");
const bcrypt = require("bcrypt");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    next(err);
  }
};

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
    return res.json(projectedMessages);
  } catch (err) {
    next(err);
  }
};
