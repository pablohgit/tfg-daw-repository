// Archivo que configura las rutas que usa el usuario mediante
// el archivo del controllador
const { register, login, setAvatar, allUsers } = require("../controllers/userController");

const router = require("express").Router();

/**
 * GET
 */
router.get("/allUsers/:id", allUsers);

/**
 * POST
 */
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);

module.exports = router;
