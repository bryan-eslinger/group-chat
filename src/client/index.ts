const appendMessage = (root: Element | null, text: string) => {
    if (!root) { return }

    const message = document.createElement('p')
    message.textContent = text
    root.appendChild(message);
}

(() => {
    const input: HTMLInputElement | null = document.querySelector('input[name=message]');
    const messages = document.querySelector('#messages');

    const chatSocket = new WebSocket(
        "ws://localhost:8080",
    );
    
    chatSocket.onmessage = (event) => {
        console.log(`message received: ${event.data}`);
        const message = JSON.parse(event.data);
        if (message.type === 'messageReceived') {
            appendMessage(messages, message.body)
        }
    }
    
    document.querySelector('#new-message')?.addEventListener('submit', (e) => {    
        if (!input) { return }
    
        e.preventDefault();
        chatSocket.send(input.value);
        appendMessage(messages, input.value)
        input.value = '';
    })
})();
