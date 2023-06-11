var message = ''

class WebSocketService {
    // static is method or instance in the class
    static instance = null;
    // put sth later
    callbacks = {};
    static getInstance() {
        if (!WebSocketService.instace) {
            WebSocketService.instance = new WebSocketService()
        }
        return WebSocketService.instance
    }

    constructor() {
        this.socketRef = null;

    }
    connect(chaturl) {
        //127.0.0.1:8000
        //localhost:8000
        //speakup-heroku.herokuapp.com
        //ws => wss
        var ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
        var host = window.location.host
        let path; 
        if (host.includes('localhost')) {
            path = `ws://localhost:8000/ws/chat/${chaturl}/`
        } else {
            path = `${ws_scheme}://${host}/ws/chat/${chaturl}/`
        }
        console.log(path)
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log('open')
        }
        this.socketNewMessage(JSON.stringify({
            // fetch_messages => messages
            command: 'messages'
        }))
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }
        this.socketRef.onclose = () => {
            console.log('close')
            this.connect()
        }
        this.socketRef.onerror = e => {
            console.log('error in Websocket::',e)
        }
    }

    disconnect() {
        this.socketRef.close()
    }

    //this is receiving function
    socketNewMessage(data) {
        const parseData = JSON.parse(data)
        const command = parseData.command
        if (Object.keys(this.callbacks).length === 0) {
            return 
        }
        if (command === 'messages') {
            // as you can see addCallback, callbacks[command] is function. so you put Parsedata.message(s) in messagesCallback or newMessageCallback
            if (parseData.messages) {
                this.callbacks[command](parseData.messages)
            } else if (parseData.files) {
                this.callbacks[command](parseData.files)
            }
        }
        if (command === 'new_message') {
            if (parseData.message) {
                this.callbacks[command](parseData.message)
            } else if (parseData.file) {
                this.callbacks[command](parseData.file)
            }
        }
    }

    fetchMessages(username, ChatID) {
        this.sendMessage({command: 'fetch_messages',
         username: username,
        ChatID: ChatID})
    }
    
    newChatMessage(message) {
        console.log('newChatMessage::', message)
        this.sendMessage({command: 'new_message',
        from: message.from,
        message: message.content,
        ChatID: message.ChatID,
        files:message.files})
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback
    }

    sendMessage(data) {
        console.log('data in sendMessage',data)
        try {
            this.socketRef.send(JSON.stringify({...data }))
        } catch (err) {
            console.log(err.message)
        } 
    }
    state() {
        return this.socketRef.readyState
    }
}

// WebSocketInstance is new instance 
const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance;