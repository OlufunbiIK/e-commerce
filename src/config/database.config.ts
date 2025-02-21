export default () => ({
  port: parseInt(process.env.PORT) || 3000, // Default fallback to 3000 if not specified
  db: {
    host:
      process.env.NODE_ENV === 'production' ? process.env.PGHOST : 'localhost',
    port: parseInt(
      process.env.NODE_ENV === 'production' ? process.env.PGPORT : '5433',
    ),
    username:
      process.env.NODE_ENV === 'production' ? process.env.PGUSER : 'postgres', //Database confiq
    password:
      process.env.NODE_ENV === 'production' ? process.env.PGPASSWORD : 'funbi', //Change password to your own
    database:
      process.env.NODE_ENV === 'production'
        ? process.env.PGDATABASE
        : 'ecommerce-project',
    url: process.env.DATABASE_URL, //required for remote db
  },
});
