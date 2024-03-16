// variables
let successSound = document.querySelector("#success");
let failSound = document.querySelector("#fail");
let startSound = document.querySelector("#start");
let triesElement = document.querySelector(".tries span");
let playerName = document.querySelector(".name span");
let overlay = document.querySelector(".overlay");
let overlayBtn = document.querySelector(".overlay span");
let duration = 1000;
let blocksContainer = document.querySelector(".blocks-container");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

// Working and logics
overlayBtn.onclick = function () {
  let theName = prompt("What's your name?");
  if (theName === null || theName === "") {
    playerName.innerHTML = "Unknown";
  } else {
    playerName.innerHTML = theName;
    localStorage.setItem("playerOneName", theName);
    startSound.play();
  }
  overlay.remove();
};
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

// Functions
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[random] = temp;
    array[current] = array[random];
  }
  return array;
}
function flipBlock(element) {
  element.classList.add("clicked");
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("clicked")
  );
  if (allFlippedBlocks.length === 2) {
    clickDisabled();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
function clickDisabled() {
  blocksContainer.classList.add("click-disabled");
  setTimeout(() => {
    blocksContainer.classList.remove("click-disabled");
  }, duration);
}
function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.object === secondBlock.dataset.object) {
    firstBlock.classList.remove("clicked");
    secondBlock.classList.remove("clicked");
    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
    successSound.play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    localStorage.setItem("playerOneTries", triesElement.innerHTML);
    setTimeout(() => {
      firstBlock.classList.remove("clicked");
      secondBlock.classList.remove("clicked");
      failSound.play();
    }, duration);
  }
}
console.log(localStorage.getItem("playerOneName"));
console.log(localStorage.getItem("playerOneTries"));
