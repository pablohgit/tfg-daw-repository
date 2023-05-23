export const host = "http://localhost:5000";

/** constantes que llama a la api que se genera en el servidor,
 * arriba se crea la constante que hace referencia al mismo
 * Este segmento hace referencia a las rutas relacionadas con la parte del usuario
 */
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;

/** constantes que llama a la api que se genera en el servidor,
 * arriba se crea la constante que hace referencia al mismo
 * Este segmento hace referencia a las rutas relacionadas con la parte de los mensajes
 */
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessageRoute = `${host}/api/messages/getmsg`;
