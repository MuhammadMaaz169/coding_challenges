import { HttpStatusCode } from "axios";

export const success = function (reply, data, statusCode = HttpStatusCode.Ok) {
  const formattedResponse = {
    success: true,
    data: data,
  };

  return reply.status(statusCode).send(formattedResponse);
};

export const pagination = function (reply, data, totalRecords) {
  reply.header("total-records", totalRecords);
  return success(reply, data);
};

export const fail = function (reply, data, statusCode = HttpStatusCode.BadRequest) {
  const formattedResponse = {
    success: false,
    data: data,
  };

  return reply.status(statusCode).send(formattedResponse);
};
