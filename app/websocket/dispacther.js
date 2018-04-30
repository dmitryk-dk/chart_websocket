export const WS_EVENTS = ['open', 'error', 'close', 'message'];

export default (websocket, actions) => WS_EVENTS.forEach((eventType) => {
    websocket.on(eventType, payload => {
        if (payload.type) {
            actions[payload.type](payload.value);
        }
    });
});
