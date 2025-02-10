import crypto from 'crypto';

// Configuración del bot (puedes usar variables de entorno en producción)
const BOT_TOKEN = process.env.BOT_TOKEN || '8128204275:AAEkUjut5pyH5GYxwo1V--g54dcotVWT_Vo';
export const BOT_USERNAME = process.env.BOT_USERNAME || 'login_gastos_bot';

// Calcula la clave secreta a partir del BOT_TOKEN
const TELEGRAM_SECRET = crypto.createHash('sha256').update(BOT_TOKEN).digest();

// Función para verificar la autenticidad de los datos recibidos
export function checkTelegramAuth(authData) {
  const data = { ...authData };
  const checkHash = data.hash;
  delete data.hash;

  const dataCheckArr = [];
  Object.keys(data).forEach(key => {
    dataCheckArr.push(`${key}=${data[key]}`);
  });
  dataCheckArr.sort();
  const dataCheckString = dataCheckArr.join('\n');

  const hmac = crypto.createHmac('sha256', TELEGRAM_SECRET)
                     .update(dataCheckString)
                     .digest('hex');

  if (hmac !== checkHash) {
    throw new Error('Data is NOT from Telegram');
  }

  // Verifica que auth_date no tenga más de 24 horas de antigüedad
  const authDate = parseInt(data.auth_date, 10);
  const currentTime = Math.floor(Date.now() / 1000);
  if ((currentTime - authDate) > 86400) {
    throw new Error('Data is outdated');
  }
  return authData;
}

// Función para guardar la data del usuario en una cookie
export function saveTelegramUserData(reply, authData) {
  const authDataJson = JSON.stringify(authData);
  reply.setCookie('tg_user', authDataJson, { path: '/' });
}