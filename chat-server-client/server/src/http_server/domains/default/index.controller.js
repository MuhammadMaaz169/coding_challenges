import { HttpStatusCode } from 'axios';
import { success } from '../../../common/response.js';

export const defaultController = (req, reply) => {
    return success(reply, { message: 'hello' }, HttpStatusCode.Ok)
};

