import { clients } from "./data.js";

export const transmitMessage = (payload, ws) => {
    if (clients.has(payload.to)) {
        clients.get(payload.to).send(
            JSON.stringify({
                type: 'message',
                from: ws.username,
                message: payload.message,
            })
        );
    } else {
        ws.send(JSON.stringify({ type: 'error', message: 'User not found' }));
    }
};