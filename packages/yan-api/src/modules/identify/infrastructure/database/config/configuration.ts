export const DBConfiguration = () => ({
  DATABASE_PORT: process.env.DATABASE_PORT || '5443',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'user',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'password',
  DATABASE_NAME: process.env.DATABASE_NAME || 'yan-flashcards',
});
