export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  db: {
    host: 'localhost', // These will be ignored when URL is used
    port: 5433,
    username: 'postgres',
    password: 'funbi',
    database: 'ecommerce-project',
    url: process.env.DATABASE_URL,
  },
});
