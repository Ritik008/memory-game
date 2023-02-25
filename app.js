const section = document.querySelector("section");
const playerFlipCount = document.querySelector("span");
const exit = document.querySelector(".exit");
const timer = document.querySelector(".timer");

let flipCount = 0;
let time = 02 + ":" + 00;
let winningScore = 8

playerFlipCount.textContent = flipCount;
timer.innerHTML = time

const getData = () => [
  { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 6, name: "lep zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 14, name: "lep zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {
  const cardData = randomize();
  cardData.forEach((item, index) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;

    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.append(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

// check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    console.log( flippedCards[0].getAttribute("name"),flippedCards[1].getAttribute("name"))
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
      flipCount++;
      playerFlipCount.textContent = flipCount;
      if (flipCount === winningScore) {
        setTimeout(() => {
          restart("You won the game");
        }, 1000);
      }
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1000);
      });
    }
  }
};

const restart = (text) => {
  const cardData = randomize();
  const faces = document.querySelectorAll(".face");
  const cards = document.querySelectorAll(".card");
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    cards[index].style.pointerEvents = "all";
    faces[index].src = item.imgSrc;
    cards[index].setAttribute('name', item.name)
  });
  flipCount = 0;
  playerFlipCount.textContent = flipCount;
  setTimeout(() => window.alert(text), 100);
};

exit.addEventListener("click", () => {
  restart("");
});

cardGenerator();

const startTimer = () => {
  let presentTime = timer.innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if (m < 0) {
    return;
  }

  timer.innerHTML = m + ":" + s;
  if(flipCount < 8 && m === '0' && s === '00') {
    setTimeout(() => {
        window.alert('time up!')
    }, 100);
  }
  setTimeout(startTimer, 1000);
};

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

startTimer();