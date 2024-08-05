import { clients } from "./data.js";

export const registerUser = (payload, ws) => {
    // TODO: add the email validation through a OTP
    ws.email = payload.email;

    clients.set(payload.email, ws);
    ws.send(JSON.stringify({ type: 'info', message: 'User registered successfully' }));
};
