const socket = io('http://localhost:8005')

const form = document.getElementById('send-container');
const msginp = document.getElementById('msginput');
const msgcontainer = document.querySelector(".my-container");
var audio_ting = new Audio('/assets/sound/ting.mp3');

// const names = prompt("enter your name to join : ") ;
let names ;

const takename = ()=>{
    names = prompt("enter your name to join : ") ;
    if(names ==='' || names===null){
        takename();
    }
}
takename();
socket.emit('new-user-joined' , names);


const appendmsg = (message , position) =>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('msg');
    msgElement.classList.add(position);
    msgcontainer.append(msgElement);
    if (position==='left') {
        audio_ting.play();
    }
}

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = msginp.value;
    appendmsg(`You: ${message}` , 'right');
    socket.emit('send', message);
    msginp.value = "";
})

// function to show user joined or left
const showusrname = (usr , status) =>{
    const parentdiv = document.createElement('div')
    const msgElement = document.createElement('span');
    msgElement.innerHTML='&nbsp;&nbsp;'+usr + " "+ status + " the chat"+'&nbsp;&nbsp;';
    parentdiv.classList.add('user-join-left');
    msgElement.classList.add('usr');
    parentdiv.append(msgElement);
    msgcontainer.append(parentdiv);
}

socket.on('user-joined' , name =>{
    showusrname(`${name}` , 'joined')
})

socket.on('user-left' , name =>{
    showusrname(`${name}` , 'left')
})
 
socket.on('message-recived' , data =>{
    appendmsg(`${data.name}: ${data.message}` , 'left')
}) 