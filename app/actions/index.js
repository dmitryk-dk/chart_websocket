export default ws => ({
    // sendDown: () => (state, actions) => actions.send({ type: 'down', value: 1 }),
    // sendUp: () => (state, actions) => actions.send({ type: 'up', value: 1 }),
    // down: (value) => (state) => ({ count: state.count - value} ),
    // up: (value) => state => ({ count: state.count + value }),
    messageChange: ({value}) => state => ({ 
        messages: state.messages.map(message => ({
                ...message,
                text: value
            }))
        }),
    nicknameChange: ({value}) => state => ({
        nickname: value,
    }),        
    send: e => state => {
        const message = state.messages[0];
        e.preventDefault(); 
        ws.send(message.text);
    },
    auth: e => state => {
        e.preventDefault();
        ws.send({type: 'isAuth', value: state.nickname});
    },
    isAuth: (payload) => state => {
        console.log(payload);
    }
});
