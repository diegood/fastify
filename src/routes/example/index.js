const example = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    return 'holis ❤️';
  });
};

export default example;