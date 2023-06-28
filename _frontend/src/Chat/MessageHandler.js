

export function waitForSocketConnection(callback, WebSocketInstance) {
    // const socket = this.socketRef
    //const recursion = .waitForSocketConnection
    setTimeout(
        function() {
            if (WebSocketInstance.state() === 1) {
                console.log('connection is secure')
                callback()
                return;
            } else {
                console.log('waiting for connection ....')
                waitForSocketConnection(callback, WebSocketInstance)
            } 
        }, 100);
}


export const sendMessageHandler = (WebSocketInstance, props, message, images, files) =>{
    let files_list = images.concat(files)

    const messageObject = {
        from: props.name,
        content: message,
        ChatID: props.ChatID,
        files: files_list
        
    }
    WebSocketInstance.newChatMessage(messageObject);

}

export function initializeChat(props, WebSocketInstance) {
    waitForSocketConnection(() => {
        WebSocketInstance.addCallbacks(
            props.fetch_messages,
            props.new_message)
        WebSocketInstance.fetchMessages(props.name, props.ChatID)
    }, WebSocketInstance)
}
