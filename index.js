require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require('body-parser')
const Character = require("./models/Character")

// const pdftk = require("node-pdftk");
// const herokuConfigurePath = "/app/bin/pdftk.exe";
// const configurePath = `C:\\Program Files (x86)\\PDFtk\\bin\\pdftk.exe`;

// pdftk.configure({
//   bin: herokuConfigurePath,
// });

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  )
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// routes

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

const formData = {
  "Name 2": "Jeffrey",
  "Alignment 2": "Lawful",
  "Character Class 2": "Rogue",
  "Level 2": 1,
  "STR 2": 14,
  "INT 2": 14,
  "DEX 2": 14,
  "CON 2": 14,
  "CHA 2": 14,
  "Death Save 2": 10,
  "Wands Save 2": 10,
  "Paralysis Save 2": 10,
  "Breath Save 2": 10,
  "Spells Save 2": 10,
  "Magic Save Mod 2": "+1",
  "HP 2": 4,
  "Max HP 2": 4,
  "AC 2": 16,
  "CON HP Mod 2": "+1",
  "Unarmored Ac 2": 11,
  "DEX AC Mod 2": "+1",
  "STR Melee Mod": "+1",
  "DEX Missile Mod": "+1",
  "Abilities, Skills, Weapons 2": "Class Abilities, Skills, and Weapons",
  "Initiative DEX Mod 2": "+1",
  "Reactions CHA Mod 2": "-1",
  "Equipment": "Lots of marbles, torches",
  "Weapons and Armour": "Short sword, plate mail",
  "GP": "142gp",
  "Description": "Very large in stature, grey hair",
}

// app.post('/', (req, res, next) => {
//   pdftk
//     .input("./public/CharacterSheetTemplate6.pdf")
//     .fillForm(formData)
//     .flatten()
//     .output()
//     .then((buf) => {
//       // res.type('application/pdf'); // If you omit this line, file will download
//       res.send(buf);
//     })
//     .catch(next);
// });

// app.get("/", function (req, res) {

//   fillPdf.generatePdf(formData, pdfTemplatePath, function (err, output) {
//     if (err) {
//       console.log(err)
//     }
//     if (!err) {
//       res.type("application/pdf");
//       res.send(output);
//     }
//   });
// });

// app.get("/", (req, res, next) => {
//   console.log(req.body)
//   res.send(formData)
// })

// app.listen(PORT, () => {
//         console.log(`listening on port ${PORT}`);
// });

/**
 * Get character
 */
app.get("/", async (req, res, next) => {
  const { id } = req.params
  try {
    const requestedCharacter = await Character.find()
    if (!requestedCharacter) {
      res.status(404).json({
        message: "No characters found",
      })
    }
    res.status(200).json(requestedCharacter)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

/**
 * Post character
 */
app.post("/", async (req, res, next) => {
  const {
    AC,
    alignment,
    appearance,
    armour,
    background,
    characterClass,
    name,
    charisma,
    constitution,
    dexterity,
    equipment,
    gold,
    hasSpells,
    hasLanguages,
    hitPoints,
    id,
    intelligence,
    languages,
    level,
    misfortune,
    personality,
    primeReq,
    primeReq2,
    primeReqMod,
    spells,
    strength,
    unarmouredAC,
    weapons,
    wisdom,
  } = req.body
  console.log(req.body)
  try {
    console.log("POST REQUEST RECEIVED")
    const character = new Character({
      AC,
      alignment,
      appearance,
      armour,
      background,
      characterClass,
      name,
      charisma,
      constitution,
      dexterity,
      equipment,
      gold,
      hasSpells,
      hasLanguages,
      hitPoints,
      id,
      intelligence,
      languages,
      level,
      misfortune,
      personality,
      primeReq,
      primeReq2,
      primeReqMod,
      spells,
      strength,
      unarmouredAC,
      weapons,
      wisdom,
    })
    character.save({
      AC,
      alignment,
      appearance,
      armour,
      background,
      characterClass,
      name,
      charisma,
      constitution,
      dexterity,
      equipment,
      gold,
      hasSpells,
      hasLanguages,
      hitPoints,
      id,
      intelligence,
      languages,
      level,
      misfortune,
      personality,
      primeReq,
      primeReq2,
      primeReqMod,
      spells,
      strength,
      unarmouredAC,
      weapons,
      wisdom,
    })
    console.log("New Character Added to DB", character)
    res.status(201).json(character)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB")
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  })
  .catch((err) => console.error(err))
