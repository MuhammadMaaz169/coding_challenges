// @ts-check
import { HttpStatusCode } from 'axios';
import { success } from '../../../common/response.js';
import { validateUser } from './auth.service.js';
import { AsymmetricAuthentication } from '../../../common/jwt-manager.js';
import { config } from '../../../config/index.js';

export const login = async (req, reply) => {
  const user = await validateUser(req.body.email, req.body.password);
  const accessToken = await AsymmetricAuthentication.createAsymmetricSignedJwtToken({ id: user.id }, config.jwt.accessTokenExpirationInSeconds);
  const refreshToken = await AsymmetricAuthentication.createAsymmetricSignedJwtToken({ id: user.id }, config.jwt.refreshTokenExpirationInSeconds);

  return success(reply, { accessToken, refreshToken }, HttpStatusCode.Ok);
};
