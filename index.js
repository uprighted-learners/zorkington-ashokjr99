const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (questionText) =>
  new Promise((resolve, reject) =>
    rl.question(
      questionText + "\n",
      (input) =>
        input.length > 0
          ? resolve(input.toLowerCase())
          : reject("Provide input") // makes it so user can use caps or lowercase
    )
  );

let validInvCommands = ["inventory", "items", "inv"]; // valid commands to see inventory

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
        console.log(
          "Your key works! The door is unlocked. You are now free to MOVE-TO HALLWAY"
        );
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  hallway_key: {
    //key will be moved to playerInventory
    name: "Hallway Key",
    description: "A key I can use to get into the hallway.",
    key: "hallway_key",
    look() {
      console.log(`${this.description}`);
    },
  },

  windows: {
    // does nothing
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
      //key will be moved to playerInventory
      console.log(`${this.description}`);
      playerInventory["hallway_key"] = classroomInventory.hallway_key;
      delete classroomInventory.hallway_key;
      console.log("You have added the hallway key to your inventory.");
    },
  },

  description:
    "There is a DOOR here, a teacher's DESK, and a number of WINDOWS.",
};

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
        console.log(
          "Your key works! The door is unlocked. You are now free to MOVE-TO LIBRARY."
        );
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  sign: {
    // sign has code to safe
    name: "Sign",
    description:
      "A sign. It has six digits on there... 96024? I better jot this down, incase I need it later.",
    look() {
      console.log(`${this.description}`);
    },
  },

  safe: {
    name: "Safe",
    description:
      "A metal and locked safe. It seems that there is a passcode that I need to ENTER here...",
    look() {
      console.log(`${this.description}`);
    },
    keyPad(code) {
      if (code === "96024") {
        //key will be moved to playerInventory
        console.log(
          "It opens up. Inside, is the library key. You have added the library key to your inventory."
        );
        playerInventory["library_key"] = hallwayInventory.library_key;
        delete hallwayInventory.library_key;
      } else {
        console.log("the safe remains shut. I need to find that passcode.");
      }
    },
  },

  library_key: {
    //key will be moved to playerInventory
    name: "Library key",
    description: "A key to get into the library",
    key: "library_key",
    look() {
      console.log(`${this.description}`);
    },
  },

  description:
    "There is a DOOR here that leads into the library, a SAFE (which I can KEYPAD into) that is sitting in the corner, and a SIGN.",
};

let libraryInventory = {
  // library inventory

  door: {
    name: "Corridor door",
    description: "The entrace door into a corridor. It is locked.",
    locked: true,
    interact() {
      // check that the player has a key before unlocking
      if ("corridor_key" in playerInventory) {
        this.locked = false;
        console.log(
          "Your key works! The door is unlocked. You are now free to MOVE-TO CORRIDOR."
        );
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
      //key will be moved to playerInventory
      console.log(
        "After combing through a bunch of books, you find a lanyard on one shelf with a bunch of random room keys. Possibly laid here by a janitor. After sorting all of the keys, you see one specifically for the corridor."
      );
      console.log("Corridor keys have now been added to your inventory.");
      playerInventory["corridor_key"] = libraryInventory.corridor_key;
      delete libraryInventory.corridor_key;
    },
  },

  chair: {
    // does nothing
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

  corridor_key: {
    //key will be moved to playerInventory
    name: "corridor key",
    description: "A key I can use to get into the corridor.",
    key: "corridor_key",
    look() {
      console.log(`${this.description}`);
    },
  },

  description:
    "In this small library, there seems to be some BOOKSHELVES, a CHAIR, and a DOOR that leads to a corridor.",
};

let corridorInventory = {
  // 2nd hallway inventory

  door: {
    // already unlocked
    name: "Office door",
    description: "The entrace door into an office.",
    locked: true,
    interact() {
      // no key needed here...
      if (true) {
        this.locked = false;
        console.log("It is unlocked... You are now free to MOVE-TO OFFICE.");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  description:
    "This hallway is empty and only has one DOOR. Welp, only one choice here.",
};

let officeInventory = {
  // inventory for last room

  door: {
    name: "Exit Door",
    description: "The exit door out of the school.",
    locked: true,
    interact() {
      // check that the player has a key before unlocking
      if ("exit_key" in playerInventory) {
        this.locked = false;
        console.log(
          "Your key works! The door is unlocked. You enter the wilderness and leave the school. You now have a new journey, which is finding your way back home. To be continued..."
        );
        process.exit();
      } else {
        console.log("You do not have a key!");
      }
    },
    look() {
      console.log(`${this.description}`);
    },
  },

  exit_key: {
    //key will be moved to playerInventory
    name: "Exit Key",
    description: "A key to get out of here.",
    look() {
      console.log(this.description);
    },
  },

  files: {
    name: "files",
    description:
      "An assortment of files in the corner of the room. I should sort through the envelopes.",
    look() {
      console.log(this.description);
    },
    interact() {
      //key will be moved to playerInventory
      console.log(
        "After sorting through the files, you find a key in one of the envelopes. It is the exit key."
      );
      console.log("Exit keys have now been added to your inventory.");
      playerInventory["exit_key"] = officeInventory.exit_key;
      delete officeInventory.exit_key;
    },
  },

  figurine: {
    // does nothing
    name: "Figurine",
    description:
      "A twisted figurine lays here with a weird smell. I really need to get out of here. I don't think I need to know the plot.",
    look() {
      console.log(this.description);
    },
  },

  description:
    "My ticket out should be here, in this administrator's office. There is an exit DOOR, a FIGURINE on the ground, and FILES scattered everywhere.",
};

let schoolRooms = {
  // state machine for rooms
  classroom: ["hallway"],
  hallway: ["library", "classroom"],
  library: ["corridor", "hallway"],
  corridor: ["library", "office"],
  office: ["corridor", "exit"],
};

const roomInventory = {
  // helps assign room to inventories
  classroom: classroomInventory,
  hallway: hallwayInventory,
  library: libraryInventory,
  corridor: corridorInventory,
  office: officeInventory,
};

let currentRoom = "classroom"; // starting room

start();

async function start() {
  // this is the function that will run my game
  const welcomeMessage = `You wake up in a classroom of a random school, but it is dark outside and the school seems to be quiet and abandoned.`;
  console.log(welcomeMessage);
  help();
  while (true) {
    let currentroomInv = roomInventory[currentRoom];
    let answer = await ask(currentroomInv.description);
    let action = act(answer); // look at act function below - assinging to variable
    let objectUse = keyAdd(answer); // look at act function below - assinging to variable
    // let questionToPlayer = await ask("What do you want to do?");
    if (action === "interact" || action === "i") {
      currentroomInv[objectUse].interact(); // call object method
      // console.log(playerInventory);
      // console.log(classroomInventory);
    } else if (action === "look" || action === "l") {
      currentroomInv[objectUse].look(); // call object method
    } else if (
      action === "move" ||
      action === "m" ||
      action === "move-to" ||
      action === "m-to"
    ) {
      myRoom(objectUse); // calls myRoom function to properly move rooms
    } else if (validInvCommands.includes(answer)) {
      console.log(playerInventory); // console logs current player inventory
    } else if (action === "k" || action === "keypad" || action === "key-pad") {
      let x = await ask("Enter a pin..."); // await for pin for entry
      currentroomInv[objectUse].keyPad(x); // calls keypad function
    } else if (answer === "h" || answer === "help" || answer === "heulp") {
      help(); // call help function
    } else {
      console.log("You cannot do that. Try again.");
    }
  }
}

function help() {
  // this function is called when the player asks for help. It is also placed at the beginning of the game so players know functionality.
  console.log(
    "\n" + "\n" + "Usable commands:",
    "\n" +
      "move/m/move-to/m-to: This will allow you to move to other locations if allowed",
    "\n" +
      "interact/i: This will allow you to interact with an item or room object and play with it's properties",
    "\n" +
      "look/l: This will allow you to look at an item or room object and extract information",
    "\n" +
      "keypad/key/key-pad: This will allow you to enter in a passcode into a specific object",
    "\n" + "inv/inventory: This will allow you to view your inventory",
    "\n" + "h/help/heulp: This will allow you bring up this menu for help",
    "\n" +
      "\n" +
      "Hint: you must use your second input as the a placeholder for what object you want to interact/look/move-to. For example: 'look windows'... Have fun!"
  );
}

function myRoom(newRoom) {
  // function which helps me moves to different rooms in my game
  // console.log("New Room:", newRoom);
  // console.log("Current Room:", currentRoom);
  let validTransitions = schoolRooms[currentRoom];

  if (validTransitions.includes(newRoom)) {
    let currentroomInv = roomInventory[currentRoom];
    if (currentroomInv.door.locked === false) {
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
  // function that helps me focus the 0 index of the users input, which i incorperate into my start function.
  let split = add.split(" ");
  let action = split[0];
  return action;
}

function keyAdd(add) {
  // function that helps me focus the 1 index of the users input, which i incorperate into my start function.
  let split = add.split(" ");
  let action = split[1];
  return action;
}

// ! one issue i know i have --- if user inputs an incorrect 1st index (after their 0 index), then an error will occur. The 0 index is fine though. If user inputs typo then the game will continue to run.
