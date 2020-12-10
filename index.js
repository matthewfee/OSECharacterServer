require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require('body-parser')

const Event = require("./models/Event");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/ping", (req, res, next) => {
  res.send({ ping: "pong" });
});

// app.listen(PORT, () => {
//         console.log(`listening on port ${PORT}`);
//       });

/**
 * Get event
 */
app.get("/", async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.find()
    if (!event) {
      res.status(404).json({
        message: "No messages found",
      });
    }
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * Post event
 */
app.post("/", async (req, res, next) => {
  const {eventText, eventUser, eventDate} = req.body;
  console.log(req.body)
  try {
    const event = new Event({
      eventText,
      eventUser,
      eventDate
    });
    event.save({
      eventText,
      eventUser,
      eventDate
    });
    res.status(201).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
