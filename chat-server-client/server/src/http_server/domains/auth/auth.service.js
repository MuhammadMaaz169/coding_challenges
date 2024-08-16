import { dbClient } from '../../../../prisma/client.js';
import { config } from '../../../config/index.js';

export const validateUser =  (email, password) => {
  return dbClient.user.findUniqueOrThrow({ where: { email, pass: password } });
  
};
