//define DOM elements
const counter = document.getElementById("counter");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const likesList = document.querySelector(".likes");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentsDiv = document.getElementById("list");

//define the variables
let timer = null;
let count = 0;
let paused = false;
let likes = {}; 


//Start Counter
function startCounter() {
    timer = setInterval(() => {
      if (!paused) {
        count++;
        updateCounter();
      }
    }, 1000);
  }
  
  // Stop the counter
function stopCounter() {
    clearInterval(timer);
  }
  
  // Update the counter display
  function updateCounter() {
    counter.textContent = count;
  }

// Add event listeners
minusButton.addEventListener("click", () => {
    if (!paused) {
      count--;
      updateCounter();
    }
  });
  
  plusButton.addEventListener("click", () => {
    if (!paused) {
      count++;
      updateCounter();
    }
  });
  
  heartButton.addEventListener("click", () => {
    if (!paused) {
      likes[count] = (likes[count] || 0) + 1;
      const likeItem = document.querySelector(`[data-num='${count}']`);
      if (likeItem) {
        likeItem.textContent = `${count} has been liked ${likes[count]} time(s).`;
      } else {
        const li = document.createElement("li");
        li.setAttribute("data-num", count);
        li.textContent = `${count} has been liked 1 time.`;
        likesList.appendChild(li);
      }
    }
  });
  
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    if (paused) {
      pauseButton.textContent = "resume";
      disableButtons(true);
      stopCounter();
    } else {
      pauseButton.textContent = "pause";
      disableButtons(false);
      startCounter();
    }
  });
  
  // Disable/enable buttons except pause
  function disableButtons(disable) {
    minusButton.disabled = disable;
    plusButton.disabled = disable;
    heartButton.disabled = disable;
  }
  
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText) {
      const comment = document.createElement("p");
      comment.textContent = commentText;
      commentsDiv.appendChild(comment);
      commentInput.value = "";
    }
  });
  
  // Initialize counter
  startCounter();
  