// Archivo que configura las rutas que usa el usuario mediante
// el archivo del controllador
const { addMessage, getMessages } = require("../controllers/messageController");

const router = require("express").Router();

/**
 * POST
 */
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
