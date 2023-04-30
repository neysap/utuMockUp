const form = document.querySelector('#login-form');
const content = document.querySelector('#content');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Send the login request using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/login');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Successful login
      content.style.display = 'block'; // Show the content
      showLoggedInContent(); // Call the function that displays the rest of the content
    } else {
      // Failed login
      alert('Invalid email or password');
    }
  };
  xhr.send(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
});

var startBtn = document.getElementById("submit");
startBtn.addEventListener("click", function showContent() {
    startBtn.style.display = "none";
    form.style.display = "none"
    content.style.display = 'block';
});

function toggleNav() {
    var nav = document.querySelector('nav');
    if (nav.style.display === 'none') {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }
  }
  
const myProfileLink = document.querySelector('#my-profile-link');
const myProfileSection = document.querySelector('#my-profile');

myProfileLink.addEventListener('click', function(event) {
  event.preventDefault();
  myProfileSection.style.display = (myProfileSection.style.display === 'none') ? 'block' : 'none';
  
  
});

const searchFeature = document.querySelector('#search');
const searchBar = document.querySelector('#search-bar');

searchFeature.addEventListener('click', function(event) {
  event.preventDefault();
  searchBar.style.display = (searchBar.style.display === 'none') ? 'block' : 'none';
  
  
});

const chatFeature = document.querySelector('#chat');
const chatBar = document.querySelector('#chat-bar');

chatFeature.addEventListener('click', function(event) {
  event.preventDefault();
  chatBar.style.display = (chatBar.style.display === 'none') ? 'block' : 'none';
  
  
});

const checkoutFeature = document.querySelector('#checkout');
const checkoutBar = document.querySelector('#checkout-bar');

checkoutFeature.addEventListener('click', function(event) {
  event.preventDefault();
  checkoutBar.style.display = (checkoutBar.style.display === 'none') ? 'block' : 'none';
  
  
});

function takePicture() {
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
          var video = document.createElement('video');
          video.srcObject = stream;
          video.onloadedmetadata = function(e) {
              video.play();
          };
          var canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          var dataURL = canvas.toDataURL();
          var imagePreview = document.getElementById('imagePreview');
          imagePreview.src = dataURL;
          imagePreview.style.display = 'block';
          video.srcObject.getTracks().forEach(function(track) {
              track.stop();
          });
      })
      .catch(function(err) {
          console.log('Error getting user media: ' + err);
      });
}


// Get the chat window and message input field
const chatWindow = document.getElementById("chat-window");
const messageInput = document.getElementById("message-input");

// Define a function to send messages
function sendMessage() {
  // Get the message from the input field
  const message = messageInput.value;

  // Create a new message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = message;

  // Add the message to the chat window
  chatWindow.appendChild(messageElement);

  // Clear the input field
  messageInput.value = "";
}


    

const subdomain = 'demo'; // Replace with your custom subdomain
        const frame = document.getElementById('frame');

        frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;
        

        window.addEventListener('message', subscribe);
        document.addEventListener('message', subscribe);

        function subscribe(event) {
            const json = parse(event);

            if (json?.source !== 'readyplayerme') {
                return;
            }

            // Susbribe to all events sent from Ready Player Me once frame is ready
            if (json.eventName === 'v1.frame.ready') {
                frame.contentWindow.postMessage(
                    JSON.stringify({
                        target: 'readyplayerme',
                        type: 'subscribe',
                        eventName: 'v1.**'
                    }),
                    '*'
                );
            }

            // Get avatar GLB URL
            if (json.eventName === 'v1.avatar.exported') {
                console.log(`Avatar URL: ${json.data.url}`);
                document.getElementById('avatarUrl').innerHTML = `Avatar URL: ${json.data.url}`;
                document.getElementById('frame').hidden = true;
            }

            // Get user id
            if (json.eventName === 'v1.user.set') {
                console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
            }
        }

        function parse(event) {
            try {
                return JSON.parse(event.data);
            } catch (error) {
                return null;
            }
        }

        function displayIframe() {
            document.getElementById('frame').hidden = false;
        }




       

        // https://demo.readyplayer.me/avatar?frameApi