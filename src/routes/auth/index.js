import { checkTelegramAuth, saveTelegramUserData } from '../../utils/telegram-auth.js';

import fp from 'fastify-plugin';

const auth = async (fastify) => {
  // Ruta para el callback de autenticación
  fastify.get('/auth/telegram', async (request, reply) => {
    try {
      const authData = checkTelegramAuth(request.query);
      saveTelegramUserData(reply, authData);
      reply.redirect('/');
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Ruta para cerrar sesión
  fastify.get('/auth/logout', async (request, reply) => {
    reply.clearCookie('tg_user', { path: '/' });
    reply.redirect('/');
  });
};

export default fp(auth, {
  name: 'auth-routes'
});