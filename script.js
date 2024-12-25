let userCar = document.querySelector(".userCar");
let road1 = document.getElementById("road1");
let road2 = document.getElementById("road2");
let road3 = document.getElementById("road3");
let road4 = document.getElementById("road4");
let road5 = document.getElementById("road5");
const cars = document.querySelectorAll(".car"); // Get all moving cars
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const pauseBtn = document.getElementById("pauseBtn");
let whites = document.querySelectorAll(".white");
// Move the user car based on road click

const stopBtn = document.getElementById("stopBtn");
// Move the user car based on road click
road1.addEventListener("click", function () {
  userCar.style.left = "8.5%";
});
road2.addEventListener("click", function () {
  userCar.style.left = "28.55%";
});
road3.addEventListener("click", function () {
  userCar.style.left = "48.55%";
});
road4.addEventListener("click", function () {
  userCar.style.left = "68.55%";
});
road5.addEventListener("click", function () {
  userCar.style.left = "88.55%";
});

// Function to check collision
function checkCollision() {
  const userCarRect = userCar.getBoundingClientRect();

  for (let i = 0; i < cars.length; i++) {
    const carRect = cars[i].getBoundingClientRect();

    // Check if the rectangles overlap
    if (
      userCarRect.left < carRect.right &&
      userCarRect.right > carRect.left &&
      userCarRect.top < carRect.bottom &&
      userCarRect.bottom > carRect.top
    ) {
      document.getElementById("over").innerHTML = "Game Over!";
      stopAnimations();
      restartBtn.style.backgroundColor = "blue";
      startBtn.style.display = "none";
      restartBtn.style.display = "block";
      pauseBtn.style.display = 'none';
      stopBtn.style.display = 'none';

      return true; // Collision detected
    }
  }
  return false; // No collision detected
}

// Game loop to check for collisions
function gameLoop() {
  if (checkCollision()) {
    stopAnimations();
    return; // Stop the game loop when collision is detected
  }
  requestAnimationFrame(gameLoop); // Keep checking for collisions
}

gameLoop(); // Start the game loop

let carAnimationCounts = {};
cars.forEach((car) => {
  const carClass = car.classList[0]; // Get the first class of the car
  carAnimationCounts[carClass] = 0; // Initialize the count for this car
});

// Attach the animation iteration event listener to each car
cars.forEach((car) => {
  car.addEventListener("animationiteration", function () {
    const carClass = car.classList[0]; // Get the first class of the car

    if (carAnimationCounts[carClass] !== undefined) {
      carAnimationCounts[carClass]++;

      // Calculate total animations
      const totalAnimations = Object.values(carAnimationCounts).reduce(
        (sum, count) => sum + count,
        0
      );

      // Update the score element
      document.getElementById("score").innerHTML = `${totalAnimations}`;

      console.log(
        `Animation Count for ${carClass}: ${carAnimationCounts[carClass]}`
      );
    } else {
      console.warn(`Class ${carClass} not found in carAnimationCounts.`);
    }
  });
});

startBtn.addEventListener("click", function () {
  startDrive();
  startBtn.style.display = 'none';
  stopBtn.style.display = 'block';
});


// Stop Button: Stops all animations
stopBtn.addEventListener("click", function () {
  stopAnimations();
  setTimeout(() => {
    location.reload();
  }, 100);
});

// Stop all animations
function stopAnimations() {
  cars.forEach((car) => {
    car.style.animation = "none";
  });
  whites.forEach(white => {
    white.style.animation = "none";
  });
}

function startDrive() {
  cars.forEach((car) => {
    const random = Math.floor(Math.random() * 6 + 4).toFixed(3);
    if (random < 5) {
      car.style.backgroundImage = "url('sports.jpg')";
      car.style.height = "6rem";
    } else if (random < 7) {
      car.style.backgroundImage = "url('OIP.jpg')";
      car.style.height = "4em";
    } else if (random < 9) {
      car.style.backgroundImage = "url('car.png')";
      car.style.height = "4em";
    } else if (random < 11) {
      car.style.backgroundImage = "url('miniTruck.png')";
      car.style.height = "6rem";
    } else if (random < 13) {
      car.style.backgroundImage = "url('truck.png')";
      car.style.height = "6rem";
    }
    car.style.animation = "none";
    userCar.style.animation = "none";
    setTimeout(() => {
      car.style.animation = `drive1 ${random}s linear infinite`;
      // userCar.style.display = "block";
      userCar.style.animation = `user 5s linear`;
    }, 10);
    whites.forEach(white => {
      white.style.animation = "white 5s linear infinite";
    });
  })
  }
  
function restartDrive() {
  location.reload();
  startDrive();
}
restartBtn.addEventListener("click", function () {
  restartDrive();
});
