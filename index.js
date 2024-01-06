const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (questionText) =>
  new Promise((resolve, reject) =>
    rl.question(questionText + "\n", (input) =>
      input.length > 0 ? resolve(input.toLowerCase()) : reject("Provide input")
    )
  );

let validInvCommands = ["i", "inventory", "items", "inv"]; // valid commands to see inventory

let playerInventory = {}; // personal inventory ---- will pickup items and place here

let classroomInventory = {
  // classroom inventory

  door: {
    name: "Classroom door",
    description: "The classroom door - looks like it leads into the hallway.",
    locked: true,
    interact() {
      // check that the player has a key before unlocking
      if ("classroom_key" in playerInventory) {
        this.locked = false;
        console.log("Your key works!");
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },
  classroom_key: {
    name: "Classroom Key",
    description: "A key for the classroom door",
    take: true,
    key: "classroom_key",
    look() {
      console.log(`${this.description}`);
    },
    take(item) {
      if (item.take === true) {
        this[item.key] = item;
        console.log(`You have taken the ${item}.`);
      }
    },
  },
  windows: {
    name: "Classroom Windows",
    description: "bullet proof and sealed shut. No chance these will open.",
    descriptionplus: "nothing I can do here.",
    look() {
      console.log(`${this.description}`);
    },
    interact() {
      console.log(`${this.descriptionplus}`);
    },
  },
  desk: {
    name: "Teacher's Desk",
    description:
      "It looks like an instructor's desk. There is a key on top of it.",
    look() {
      console.log(`${this.description}`);
    },
  },
  description:
    "There is a door here. There is a handwritten sign on the floor. A teacher's desk as well. There are also a number of windows.",
};

let hallwayInventory = {
  // hallway inventory
  door: {
    name: "Classroom door",
    description: "The classroom door",
    locked: true,
    unlock() {
      // check that the player has a key before unlocking
      this.locked = false;
    },
  },
  hammer: {
    name: "hammer",
    description: "Looks sturdy and strong enough to break something",
    look() {
      console.log(`${this.name}`);
      return this.description;
    },
    swing() {
      return `You swing the ${this.name}`;
    },
  },
  library_key: {
    name: "Library Key",
    description: "A key to get into the library",
    take: true,
    key: "library_key",
    look() {
      console.log(`${this.name}`);
      return this.description;
    },
  },
};

let libraryInventory = {
  // library inventory
  principal_key: {
    name: "Principal's Key",
    description: "A key to get into any door in the school",
    look() {
      console.log(`${this.name}`);
      return this.description;
    },
    take(item) {
      if (item.take === true) {
        this[item.key] = item;
        console.log(`You have taken the ${item}.`);
      } else {
        console.log(`You cannot take the ${item}.`);
      }
    },
  },
};

let principalInventory = {
  master_key: {
    name: "Master Key",
    description: "A key to get out of the school",
    look() {
      console.log(`${this.name}`);
      return this.description;
    },
  },
  take(item) {
    if (item.take === true) {
      this[item.key] = item;
      console.log(`You have taken the ${item}.`);
    } else {
      console.log(`You cannot take the ${item}.`);
    }
  },
};

let schoolRooms = {
  classroom: ["hallway"],
  hallway: ["library", "classroom", "exit", "principal's office"],
  library: ["hallway"],
  principal_office: ["hallway"],
};

const roomInventory = {
  classroom: classroomInventory,
  hallway: hallwayInventory,
  library: libraryInventory,
  principal_key: principalInventory,
};

let currentRoom = "classroom";

start();

async function start() {
  // this is the function that will run my game
  const welcomeMessage = `You wake up in a classroom of a random school, but it is dark outside and the school seems to be quiet and abandoned.`;
  console.log(welcomeMessage);
  while (true) {
    currentRoom.description;
    let currentroomInv = roomInventory[currentRoom];
    let answer = await ask(currentroomInv.description);
    if ((answer === "interact door", "i door")) {
      currentroomInv.door.interact();
    } else if ((answer === "look door", "l door")) {
      currentroomInv.door.look();
    } else if (
      (answer === "interact windows",
      "interact window",
      "i window",
      "i windows")
    ) {
      currentroomInv.windows.interact();
    }

    if (answer === "interact desk") {
      currentroomInv.desk.look();
      if ((answer === "take key", "t key")) {
        currentroomInv.classroom_key.take();
        playerInventory.push(currentroomInv.classroom_key);
        delete currentroomInv.classroom_key;
      }
    }
  }
  console.log("Now write your code to make this work!");
  process.exit();
}

function myRoom(newRoom) {
  console.log("New Room:", newRoom);
  console.log("Current Room:", currentRoom);
  let validTransitions = schoolRooms[currentRoom];

  if (validTransitions.includes(newRoom)) {
    let newRoomInventory = roomInventory(newRoom);
    if (newRoomInventory.door.locked === false) {
      currentRoom = newRoom;
      console.log("You are now in:", currentRoom);
    } else {
      console.log("The door is locked.");
    }
  } else {
    console.log("You cannot jump rooms!");
  }
}
