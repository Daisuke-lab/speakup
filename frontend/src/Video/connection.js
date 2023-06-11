import openSocket from 'socket.io-client';
import Peer from 'peerjs';


let socketInstance = null;
let peers = {};


const initializePeerConnection = () => {
    // return new Peer('', {
    //     host: 'localhost', 
    //     port: 9000,                
    //     secure: false //secure=true is https and wss. secure=false is http and ws
    // });
    return new Peer()
}
const initializeSocketConnection = () => {
    const socket = openSocket('http://localhost:5000');
    return socket
}



class Connection {
    videoContainer = {};
    message = [];
    settings;
    streaming = false;
    myPeer;
    socket;
    myID = '';
    constructor(settings) {
        this.settings = settings;
        this.myPeer = initializePeerConnection();
        this.socket = initializeSocketConnection();
        this.initializeSocketEvents();
        this.initializePeersEvents();
    }
    initializeSocketEvents = () => {
        this.socket.on('connect', () => {
            console.log('socket connected');
        });
        this.socket.on('user-disconnected', (userID) => {
            console.log('user disconnected-- closing peers', userID);
            peers[userID] && peers[userID].close();
            this.removeVideo(userID);
        });
        this.socket.on('disconnect', () => {
            console.log('socket disconnected --');
        });
        this.socket.on('error', (err) => {
            console.log('socket error --', err);
        });
    }
    initializePeersEvents = () => {
        this.myPeer.on('open', (id) => {
            this.myID = id;
            const roomID = window.location.pathname.split('/')[2];
            const userData = {
                userID: id, roomID
            }
            console.log('mydata::', userData)
            this.socket.emit('join-room', userData);
            this.setNavigatorToStream();
        });
        this.myPeer.on('error', (err) => {
            console.log('peer connection error', err);
            this.myPeer.reconnect();
        })
    }
    setNavigatorToStream = () => {
        this.getVideoAudioStream().then((stream) => {
            if (stream) {
                this.streaming = true;
                this.createVideo({ id: this.myID, stream });
                this.setPeersListeners(stream);
                this.newUserConnection(stream);
            }
        })
    }
    getVideoAudioStream = (video=true, audio=true) => {
        let quality = this.settings.params?.quality;
        if (quality) quality = parseInt(quality);
        const myNavigator = navigator.mediaDevices.getUserMedia || 
        navigator.mediaDevices.webkitGetUserMedia || 
        navigator.mediaDevices.mozGetUserMedia || 
        navigator.mediaDevices.msGetUserMedia;
        return myNavigator({
            video: video ? {
                frameRate: quality ? quality : 12,
                noiseSuppression: true,
                width: {min: 640, ideal: 1280, max: 1920},
                height: {min: 480, ideal: 720, max: 1080}
            } : false,
            audio: audio,
        });
    }
    createVideo = (createObj) => {
        console.log('video created')
        if (!this.videoContainer[createObj.id]) {
            this.videoContainer[createObj.id] = {
                ...createObj,
            };
            const roomContainer = document.getElementById('room-container');
            const videoContainer = document.createElement('div');
            const video = document.createElement('video');
            video.srcObject = this.videoContainer[createObj.id].stream;
            video.id = createObj.id;
            video.autoplay = true;
            if (this.myID === createObj.id) {
                video.muted = true;
                video.className = 'my_video'
            }
            videoContainer.appendChild(video)
            roomContainer.append(videoContainer);
        } else {
            const video = document.getElementById(createObj.id)
            video.srcObject = createObj.stream
        }
    }
    setPeersListeners = (stream) => {
        //stream is my stream
        this.myPeer.on('call', function(call) {
            console.log('answered!!')
            call.answer(stream);
            call.on('stream', (userVideoStream) => {
                console.log('user stream data', userVideoStream)
                this.createVideo({ id:call.metadata.id, stream:userVideoStream})
            });
            call.on('close', () => {
                console.log('closing peers listeners', call.metadata.id);
                this.removeVideo(call.metadata.id);
            });
            call.on('error', () => {
                console.log('peer error ------');
                this.removeVideo(call.metadata.id);
            });
            peers[call.metadata.id] = call;
        });
    }
    newUserConnection = (stream) => {
        //stream is my stream
        this.socket.on('new-user-connect', (userData) => {
            this.connectToNewUser(userData, stream);
        });
    }
    connectToNewUser(userData, stream) {
        console.log('connectTonewUser is called')
        const { userID } = userData;
        const call = this.myPeer.call(userID, stream, { metadata: { id: this.myID }} );
        console.log('your data:: new user connected', userData)
        call.on('stream', (userVideoStream) => {
            //userVideoStream is your stream
            console.log('your stream::', userVideoStream)
            this.createVideo({ id: userID, stream: userVideoStream, userData });
        });
        call.on('close', () => {
            console.log('closing new user', userID);
            this.removeVideo(userID);
        });
        call.on('error', () => {
            console.log('peer error ------')
            this.removeVideo(userID);
        })
        peers[userID] = call;
    }
    removeVideo = (id) => {
        delete this.videoContainer[id];
        const video = document.getElementById(id);
        if (video) video.remove();
    }
    destroyConnection = () => {
        const myMediaTracks = this.videoContainer[this.myID]?.stream.getTracks();
        myMediaTracks?.forEach((track) => {
            track.stop();
        })
        socketInstance?.socket.disconnect();
        this.myPeer.destroy();
    }
}

export default function createSocketConnectionInstance(settings={}) {
    return socketInstance = new Connection(settings);
}