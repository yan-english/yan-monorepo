export const REFRESH_TOKEN_PREFIX = 'refresh_token:';
export const PERMISSIONS_PREFIX = 'permissions:';

export const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

export const PERMISSION_EXPIRATION = 60 * 60 * 24 * 30;

export const JWT_CONSTANTS = {
  secret: 'yan-flashcards', // Replace with an environment variable in production
  expiresIn: '100h', // Example expiration time
};
