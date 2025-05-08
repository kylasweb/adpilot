const socket = io('http://localhost:3000'); // Replace with your signaling server URL
let localStream;
let remoteStream;
let peerConnection;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const roomId = 'test-room'; // Replace with your desired room ID
const userId = Math.random().toString(36).substring(7);

socket.on('connect', () => {
  console.log('Connected to signaling server');
  socket.emit('join-room', roomId, userId);
});

socket.on('user-connected', (userId) => {
  console.log('User connected:', userId);
  createOffer(userId);
});

socket.on('user-disconnected', (userId) => {
  console.log('User disconnected:', userId);
});

socket.on('offer', async (description) => {
  console.log('Received offer');
  if (!peerConnection) {
    await createPeerConnection();
  }
  await peerConnection.setRemoteDescription(description);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit('answer', roomId, peerConnection.localDescription);
});

socket.on('answer', async (description) => {
  console.log('Received answer');
  await peerConnection.setRemoteDescription(description);
});

socket.on('ice-candidate', async (candidate) => {
  console.log('Received ICE candidate');
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (e) {
    console.error('Error adding ICE candidate:', e);
  }
});

async function startVideo() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('localVideo').srcObject = localStream;
  } catch (e) {
    console.error('Error getting user media:', e);
  }
}

async function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', roomId, event.candidate);
    }
  };

  peerConnection.ontrack = (event) => {
    document.getElementById('remoteVideo').srcObject = event.streams[0];
  };

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });
}

async function createOffer(userId) {
  await createPeerConnection();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit('offer', roomId, peerConnection.localDescription);
}

startVideo();