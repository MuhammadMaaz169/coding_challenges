import { HttpStatusCode } from 'axios';
import { CustomError } from './custom-error.js';
import { AsymmetricAuthentication } from './jwt-manager.js';

export const auth = async (req, reply) => {
  const token = req?.cookies?.accessToken;
  let tokenPayload;
  try {
    tokenPayload = await AsymmetricAuthentication.verifyAsymmetricSignedJwtToken(token);
  } catch (error) {
    throw new CustomError('Failed to verify token', HttpStatusCode.BadRequest);
  }
  req.userId = tokenPayload?.user?.userId;
};
