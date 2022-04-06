const mongoose = require("mongoose")

const characterSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // AC: {
  //   type: Number,
  //   required: false,
  // },
  // eventUser: {
  //   type: String,
  //   required: false,
  // }

  AC: {
    type: Number,
    required: true,
  },
  alignment: {
    type: String,
    required: true,
  },
  appearance: {
    type: String,
    required: false,
  },
  armour: {
    type: Array,
    required: false,
  },
  background: {
    type: String,
    required: false,
  },
  characterClass: {
    type: String,
    required: true,
  },
  characterName: {
    type: String,
    required: false,
  },
  charisma: {
    type: Number,
    required: true,
  },
  constitution: {
    type: Number,
    required: true,
  },
  dexterity: {
    type: Number,
    required: true,
  },
  equipment: {
    type: Array,
    required: false,
  },
  gold: {
    type: Number,
    required: true,
  },
  hasSpells: {
    type: Boolean,
    required: false,
  },
  hasLanguages: {
    type: Boolean,
    required: true,
  },
  hitPoints: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  intelligence: {
    type: Number,
    required: true,
  },
  languages: {
    type: Array,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  misfortune: {
    type: String,
    required: false,
  },
  personality: {
    type: String,
    required: false,
  },
  primeReq: {
    type: String,
    required: true,
  },
  primeReq2: {
    type: String,
    required: false,
  },
  primeReqMod: {
    type: String,
    required: true,
  },
  spells: {
    type: Array,
    required: false,
  },
  strength: {
    type: Number,
    required: true,
  },
  unarmouredAC: {
    type: Number,
    required: false,
  },
  weapons: {
    type: Array,
    required: false,
  },
  wisdom: {
    type: Number,
    required: true,
  },
})

//

const Character = mongoose.model(
  "Character",
  characterSchema,
  "oldschoolessentials",
)

module.exports = Character
