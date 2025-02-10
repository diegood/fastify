import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cookie from '@fastify/cookie';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true
});

const pluginOptions = {
  // Place your custom options for the autoload plugin below here.
}

// Register cookie plugin
await fastify.register(cookie);

fastify.register(AutoLoad, {
  dir: join(__dirname, 'plugins'),
  options: pluginOptions
});

fastify.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  options: pluginOptions
});

fastify.listen({ host: '::', port: Number(process.env.PORT) || 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
});