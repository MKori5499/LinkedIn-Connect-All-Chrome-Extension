let isSendingConnections = false; // Check whether connections are sent or not
let stopButton = null; // Reference to the stop button
let currentTimeouts = []; // Array to store timeouts

//Function to Create Floating Button
function createButton(label, id, position) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.id = id;
  button.style.position = "fixed";
  button.style.top = position.top;
  button.style.right = position.right;
  button.style.padding = "15px 30px";
  button.style.fontSize = "16px";
  button.style.backgroundColor = "#ff9f1c";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.color = "#fff";
  button.style.zIndex = "1000";
  button.style.cursor = "pointer";
  document.body.appendChild(button);
  return button;
}

//Function to Send Connections
function clickConnectButtons() {
  //get the buttons on the Linkedin in page
  const allButtons = document.querySelectorAll("button");
  const connectBtns = [];

  //looping for all buttons and filtering with the text "Connect"
  allButtons.forEach(function (btn) {
    if (btn.innerText.trim() === "Connect" && btn.offsetParent !== null) {
      connectBtns.push(btn);
    }
  });

  //check if no connectable profiles are found
  if (connectBtns.length === 0) {
    console.log("No 'Connect' buttons found.");
    alert("No connectable profiles found.");
    stopConnectionSending(); // Stop process if no buttons found
    return;
  }

  console.log(`Found ${connectBtns.length} connectable profiles.`);

  let delay = 0;
  connectBtns.forEach((btn, index) => {
    if (!isSendingConnections) return;

    const timeoutId = setTimeout(() => {
      btn.click();
      console.log(`Sent connection request to profile #${index + 1}`);
    }, delay);
    currentTimeouts.push(timeoutId);

    delay += Math.floor(Math.random() * 2000) + 1000; //delay between 1 to 3 seconds
  });
}

//Function to Stop Sending Connections
function stopConnectionSending() {
  isSendingConnections = false;
  console.log("Connection sending stopped.");

  currentTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  currentTimeouts = [];

  if (stopButton) {
    stopButton.disabled = true;
  }
}

//Start Sending Connections
function startConnectionSending() {
  if (isSendingConnections) return;

  //Adding delay
  console.log("Starting connection sending in 3 seconds...");
  setTimeout(() => {
    isSendingConnections = true;
    clickConnectButtons();
  }, 3000);
}

const connectAllBtn = createButton("Connect with All", "connectAllBtn", {
  top: "20px",
  right: "20px",
});
stopButton = createButton("Stop", "stopBtn", { top: "80px", right: "20px" });

// Event listener for the "Connect with All" button
connectAllBtn.addEventListener("click", function () {
  startConnectionSending();
});

// Event listener for the "Stop" button
stopButton.addEventListener("click", function () {
  stopConnectionSending();
});

//Time to time Check for 'Connect' Buttons
function checkForConnectButtons() {
  const allButtons = document.querySelectorAll("button");

  if (allButtons.length === 0) {
    console.log("No 'Connect' buttons found on the page yet, retrying...");
    setTimeout(checkForConnectButtons, 1000);
  } else {
    console.log("Found 'Connect' buttons!");
  }
}

// Start checking for connectable profiles
checkForConnectButtons();
