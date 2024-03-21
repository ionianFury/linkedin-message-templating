const popupDiv = document.createElement('div');
popupDiv.id = 'myExtensionPopupWindow';

const minimizeButton = document.createElement('button');
minimizeButton.innerText = '–';
minimizeButton.id = 'minimizeButton';

popupDiv.appendChild(minimizeButton);

const messageBox = document.createElement('textarea');
messageBox.setAttribute('placeholder', 'Shkruaj shabllonin e mesazhit...\n\nSpecial tags:\n{{firstName}}\n{{lastName}}');
messageBox.id = 'messageBox';

messageBox.value = localStorage.getItem('messageTemplate') || '';

const saveButton = document.createElement('button');
saveButton.innerText = 'Ruaj shabllonin';
saveButton.id = 'saveButton';

const statusText = document.createElement('p');
statusText.id = 'statusText';
const statusCircle = document.createElement('span');
statusCircle.id = 'statusCircle';

popupDiv.appendChild(messageBox);
popupDiv.appendChild(saveButton);
popupDiv.appendChild(statusText);
statusText.appendChild(statusCircle);

document.body.appendChild(popupDiv);

saveButton.addEventListener('click', () => {
  localStorage.setItem('messageTemplate', messageBox.value);
  updateStatus();
});

minimizeButton.addEventListener('click', () => {
  popupDiv.classList.toggle('minimized');
});

function insertMessageIntoNewElement() {
  let messageTemplate = localStorage.getItem('messageTemplate');
  if (!messageTemplate) return; // Exit if there's no template

  setTimeout(() => {
    // Attempt to fetch the full name using the first selector
    let fullNameElement = document.querySelector('.msg-s-profile-card .profile-card-one-to-one__profile-link');
    
    // If the first selector didn't find an element, try the second selector
    if (!fullNameElement) {
      fullNameElement = document.querySelector('.msg-overlay-conversation-bubble-header .msg-overlay-bubble-header__title span');
    }

    const fullName = fullNameElement ? fullNameElement.textContent.trim() : '';
    const [firstName, lastName] = fullName.split(' ');

    // Replace the placeholders with actual first and last names
    if (firstName && lastName) {
      messageTemplate = messageTemplate.replace('{{firstName}}', firstName).replace('{{lastName}}', lastName);
    }

    const containerElement = document.querySelector('.msg-form__contenteditable');
    if (containerElement) {
      // Clear existing content
      containerElement.innerHTML = '';

      // Find the message maximize button
      const messageMaximizeButton = document.querySelector('.msg-overlay-conversation-bubble-header .msg-overlay-bubble-header__control');

      // Maximize message buble for easier editing
      if (messageMaximizeButton) {
        messageMaximizeButton.click();
      }

      // Split the message by newline and create separate <p> tags
      const lines = messageTemplate.split('\n');
      lines.forEach((line, index) => {
        const pElement = document.createElement('p');
        pElement.textContent = line;
        containerElement.appendChild(pElement);

        // If it's not the last line, add a <br> tag within the <p> element
        if (index !== lines.length - 1) {
          pElement.appendChild(document.createElement('br'));
        }
      });

      // Dispatch an 'input' event to simulate user typing
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      containerElement.dispatchEvent(event);

      const placeholderElement = document.querySelector('.msg-form__msg-content-container .msg-form__placeholder');
      if (placeholderElement) {
        placeholderElement.style.display = 'none';
      }

      const sendButton = document.querySelector('.msg-overlay-conversation-bubble .msg-form__send-button');
      if (sendButton) {
        sendButton.removeAttribute('disabled');
      }

    }
  }, 500);
}

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.matches('.msg-form__contenteditable')) { // Check if the added node is an element and matches the class
          insertMessageIntoNewElement();
        }
      });
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the document body for configured mutations
observer.observe(document.body, config);

function updateStatus() {
  const templateExists = !!localStorage.getItem('messageTemplate');
  const onCorrectPage = window.location.href.startsWith('https://www.linkedin.com/search/results/people/');

  if (templateExists && onCorrectPage) {
    statusText.innerHTML = 'Status: gjithcka ne rregull <span id="statusCircle" style="background-color: green;"></span>';
  } else if (!templateExists && !onCorrectPage) {
    statusText.innerHTML = 'Status: mungon shablloni!<br>Status: shko tek <a id="peopleLink" href="https://www.linkedin.com/search/results/people/">People</a> <span id="statusCircle" style="background-color: yellow;"></span>';
  } else if (!templateExists) {
    statusText.innerHTML = 'Status: mungon shablloni! <span id="statusCircle" style="background-color: yellow;"></span>';
  } else if (!onCorrectPage) {
    statusText.innerHTML = 'Status: kliko te linku <a id="peopleLink" href="https://www.linkedin.com/search/results/people/">People</a> <span id="statusCircle" style="background-color: yellow;"></span>';
  }
}

updateStatus();

// Polling for URL change
let lastUrl = location.href; 
setInterval(() => {
const currentUrl = location.href;
if (lastUrl !== currentUrl) {
  lastUrl = currentUrl;
  updateStatus();
}
}, 1000);
