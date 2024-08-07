import fs from 'fs';
import path from 'path';

import nodeJose from 'node-jose';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { fileURLToPath } from 'url';

import { getCurrentTimeInSeconds } from '../utils/date-time.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const KEYS_FILE_PATH = path.join(__dirname, '..', '..', 'json-web-token-keys.json');
const KEY_PREFIX = 'secret-';
const ALGORITHM = 'RS256';
const ALGORITHM_FAMILY = 'RSA';
const SIZE_IN_BITS = 2048;
const KEY_EXPIRY_IN_SECOND = 315360000;

export class AsymmetricAuthentication {
  static keyStore;

  static async initializeKeyStore() {
    const isExist = fs.existsSync(KEYS_FILE_PATH);
    if (isExist) {
      const jwks = fs.readFileSync(KEYS_FILE_PATH);
      this.keyStore = await nodeJose.JWK.asKeyStore(JSON.parse(jwks));

      return this.keyStore
    }

    this.keyStore = nodeJose.JWK.createKeyStore();
    await this.generateKeyPair({
      status: 'active',
    });
    this.saveKeysToFileSystem();

    return this.keyStore.toJSON(true);
  }

  static async createAsymmetricSignedJwtToken(payload, expiryTimeInSeconds = null) {
    if (!this.keyStore) await this.initializeKeyStore();

    const currentTimeInSeconds = getCurrentTimeInSeconds();
    const options = {
      iat: currentTimeInSeconds,
    };
    if (expiryTimeInSeconds) options.exp = Number(currentTimeInSeconds + expiryTimeInSeconds);
    let clonedPayload = { ...payload, ...options };
    const privateKey = this.getActivePrivateKeyInJwkFormat();

    const token = await nodeJose.JWS.createSign({ format: 'compact' }, privateKey)
      .update(JSON.stringify(clonedPayload))
      .final();

    return token;
  }

  static async verifyAsymmetricSignedJwtToken(token) {
    const publicKey = AsymmetricAuthentication.getActivePublicKeyInJwkFormat();
    const signingKey = jwkToPem(publicKey);

    const decodedToken = jwt.verify(token, signingKey);
    return decodedToken;
  }

  static saveKeysToFileSystem() {
    const privateKeys = this.getPrivateKeys();

    const directoryPath = path.dirname(KEYS_FILE_PATH);
    if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath, { recursive: true });

    fs.writeFileSync(KEYS_FILE_PATH, JSON.stringify(privateKeys, null, 2));
  }

  static getPublicKeys() {
    return this.keyStore.toJSON();
  }

  static getActivePublicKeyInJwkFormat() {
    const publicKeysJwks = this.getPublicKeys();
    const activeKey = publicKeysJwks.keys.find((publicKey) => publicKey.status == 'active');
    return activeKey;
  }

  static getPrivateKeys() {
    const exportPrivateKeys = true;
    return this.keyStore.toJSON(exportPrivateKeys);
  }

  static getActivePrivateKeyInJwkFormat() {
    const privateKeys = this.getPrivateKeys();
    const activeKey = privateKeys.keys.find((privateKey) => privateKey.status == 'active');
    return activeKey;
  }

  static async generateKeyPair({
    expiryTimeInSeconds = KEY_EXPIRY_IN_SECOND,
  }) {
    const privateKeys = this.getPrivateKeys();
    const totalNumberOfPrivateKeys = privateKeys?.keys?.length || 0;

    const key = await this.keyStore.generate(ALGORITHM_FAMILY, SIZE_IN_BITS, {
      alg: ALGORITHM,
      kid: `${KEY_PREFIX}${totalNumberOfPrivateKeys + 1}`,
      exp: expiryTimeInSeconds,
      status: 'active',
      iat: getCurrentTimeInSeconds(),
    });
    return {
      publicKey: key.toJSON(),
      privateKey: key.toJSON(true),
    };
  }

  static async createKeyStoreWithExistingJwks() {
    const jwks = fs.readFileSync(KEYS_FILE_PATH);
    this.keyStore = await nodeJose.JWK.asKeyStore(JSON.parse(jwks));
  }
}
