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
      if ("hallway_key" in playerInventory) {
        this.locked = false;
        console.log("Your key works! The door is unlocked.");
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  hallway_key: {
    name: "Hallway Key",
    description: "A key I can use to get into the hallway.",
    key: "hallway_key",
    look() {
      console.log(`${this.description}`);
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
    name: "A teacher's desk",
    description:
      "It looks like an instructor's desk. There is a key on top of it.",
    look() {
      console.log(`${this.name}`);
    },
    interact() {
      console.log(`${this.description}`);
      playerInventory["hallway_key"] = {
        name: "Hallway Key",
        description: "A key I can use to get into the hallway.",
        key: "hallway_key",
        look() {
          console.log(`${this.description}`);
        },
      };
      delete classroomInventory.hallway_key;
      console.log("You have added the hallway key to your inventory.");
    },
  },

  description:
    "There is a door here, a teacher's desk, and a number of windows.",
};

// -------------------------------------------------------------

let hallwayInventory = {
  // hallway inventory

  door: {
    name: "Library door",
    description:
      "This is the entrace door into the library. Of course, it's locked.",
    locked: true,
    interact() {
      // check that the player has a key before unlocking
      if ("library_key" in playerInventory) {
        this.locked = false;
        console.log("Your key works! The door is unlocked.");
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  handwritten_sign: {
    name: "Handwritten Sign",
    description:
      "A handwritten sign. It has six digits on there... 96024? I better jot this down, incase I need it later.",
    look() {
      console.log(`${this.description}`);
    },
  },

  // hammer: {
  //   name: "hammer",
  //   description: "Looks sturdy and strong enough to break something",
  //   look() {
  //     console.log(`${this.name}`);
  //     return this.description;
  //   },
  //   swing() {
  //     return `You swing the ${this.name}`;
  //   },
  // },

  safe: {
    name: "Safe",
    description:
      "A metal and locked safe. It seems that there is a passcode that I need to ENTER here...",
    look() {
      console.log(`${this.description}`);
    },
    interact() {
      console.log(
        "Nice! It opened up. Inside the safe are the library keys that I can use to move forward."
      );
      console.log("Library keys have now been added to your inventory.");
      playerInventory["library_key"] = {
        name: "Library key",
        description: "A key to get into the library",
        key: "library_key",
        look() {
          console.log(`${this.description}`);
        },
      };
      delete hallwayInventory.library_key;
    },
  },

  library_key: {
    name: "Library key",
    description: "A key to get into the library",
    key: "library_key",
    look() {
      console.log(`${this.description}`);
    },
  },

  description:
    "There is a door here that leads into the library, a safe that is sitting in the corner, and a handwritten sign.",
};

let libraryInventory = {
  // library inventory
  door: {
    name: "Hallway door",
    description:
      "The entrace door into another hallway. It is locked. Maybe my old one works.",
    locked: true,
    interact() {
      // check that the player has a key before unlocking
      if ("hallway_key" in playerInventory) {
        this.locked = false;
        console.log("Your key works! The door is unlocked.");
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  bookshelves: {
    name: "Bookshelves",
    description: "A ton of bookshelves that I can LOOK into.",
    look() {
      console.log(`${this.description}`);
    },
    interact() {
      console.log(
        "After combing through a bunch of books, you find a lanyard on one shelf with a bunch of random room keys. Possibly laid here by a janitor. After sorting all of the keys, you see one specifically for the principal's room."
      );
      console.log("Pricipal's keys have now been added to your inventory.");
      playerInventory["principal_key"] = {
        name: "Principal's key",
        description: "A key I can use to get into the principal's office.",
        key: "principal_key",
        look() {
          console.log(`${this.description}`);
        },
      };
      delete libraryInventory.principal_key;
    },
  },

  chair: {
    name: "chair",
    description: "A wooden chair.",
    look() {
      console.log(`${this.description}`);
    },
    interact() {
      console.log(
        "You sit on the chair and slouch immediately. This reminds you why your posture it terrible. You get up and move on."
      );
    },
  },

  principal_key: {
    name: "Principal's key",
    description: "A key I can use to get into the principal's office.",
    key: "principal_key",
    look() {
      console.log(`${this.description}`);
    },
  },

  description:
    "In this small library, there seems to be some bookshelves, a single chair, and a door that leads to another section of the hallway.",
};

let hallwayTwoInventory = {
  // 2nd hallway inventory
  door: {
    name: "Principal's door",
    description: "The entrace door into the Principal's office. It is locked.",
    locked: true,
    interact() {
      // check that the player has a key before unlocking
      if ("principal_key" in playerInventory) {
        this.locked = false;
        console.log("Your key works! The door is unlocked.");
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  exit_door: {
    name: "Exit Door",
    description: "The exit door out of the school.",
    locked: true,
    interact() {
      // check that the player has a key before unlocking
      if ("exit_key" in playerInventory) {
        this.locked = false;
        console.log("Your key works! The door is unlocked.");
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  description:
    "This hallway is empty and only has two doors. One door is the Principal's door, the other is the exit door. My ticket out!",
};

let principalInventory = {};

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
    let action = act(answer);
    let objectUse = keyAdd(answer);
    // let questionToPlayer = await ask("What do you want to do?");
    if (action === "interact" || action === "i") {
      currentroomInv[objectUse].interact();
      // console.log(playerInventory);
      // console.log(classroomInventory);
    } else if (action === "look" || action === "l") {
      currentroomInv[objectUse].look();
    } else if (
      action === "move" ||
      action === "m" ||
      action === "move to" ||
      action === "m to"
    ) {
      currentRoomInv[objectUse].myRoom(); //!!!!!!!
    }
    // if (answer === "interact desk" || "i desk") {
    //   currentroomInv.desk.look();
    //   if (answer === "take key" || answer === "t key") {
    //     currentroomInv.classroom_key.take();
    //     playerInventory.push(currentroomInv.classroom_key);
    //   }
    // }
  }
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

function act(add) {
  let split = add.split(" ");
  let action = split[0];
  return action;
}

function keyAdd(add) {
  let split = add.split(" ");
  let action = split[1];
  return action;
}
