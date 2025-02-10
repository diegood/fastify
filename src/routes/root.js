import { BOT_USERNAME } from '../utils/telegram-auth.js';

const root = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    let html;
    const tgUserCookie = request.cookies.tg_user;

    if (tgUserCookie) {
      try {
        const tgUser = JSON.parse(tgUserCookie);
        const firstName = tgUser.first_name || 'Usuario';
        const lastName = tgUser.last_name || '';
        const username = tgUser.username
          ? `<a href="https://t.me/${tgUser.username}">${firstName} ${lastName}</a>`
          : `${firstName} ${lastName}`;

        html = `<h1>Hola, ${username}!</h1>
                ${tgUser.photo_url ? `<img src="${tgUser.photo_url}" alt="Foto de usuario">` : ''}
                <p><a href="/auth/logout">Cerrar sesión</a></p>`;
      } catch (e) {
        html = '<h1>Error al procesar la cookie</h1>';
      }
    } else {
      html = `
        <h1>Inicia sesión con Telegram</h1>
        <script async src="https://telegram.org/js/telegram-widget.js?7"
                data-telegram-login="${BOT_USERNAME}"
                data-size="large"
                data-userpic="false"
                data-request-access="write"
                data-auth-url="/auth/telegram">
        </script>
      `;
    }

    reply.type('text/html').send(`<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Login con Telegram</title>
    </head>
    <body>
      ${html}
    </body>
    </html>`);
  });
};

export default root;