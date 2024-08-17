import { HttpStatusCode } from 'axios';
import { CustomError } from '../../common/custom-error.js';
import { AsymmetricAuthentication } from '../../common/jwt-manager.js';

export const auth = async (req, reply) => {
  const token = req.headers['authorization'];
  let tokenPayload;
  try {
    tokenPayload = await AsymmetricAuthentication.verifyAsymmetricSignedJwtToken(token);
  } catch (error) {
    throw new CustomError('Failed to verify token', HttpStatusCode.BadRequest);
  }
  req.userId = tokenPayload?.user?.userId;
};
