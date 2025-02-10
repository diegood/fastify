import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';

const fastify = Fastify({
  logger: true
});

const pluginOptions = {
  // Place your custom options for the autoload plugin below here.
}

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