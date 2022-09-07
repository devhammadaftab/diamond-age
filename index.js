const mongoose = require("mongoose")
const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.ATLAS_URI)
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB Connection Successfull");
})

const app = express();

app.use(cors());  

app.use(express.json());

app.use("/api", require("./routes/events.js"))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")))
  
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
  
} else {
    app.get("/", (req, res) => {
        res.send("Api Running")
    })
}

const port = process.env.PORT || 5000

app.listen(port, () =>
    console.log(`Running on PORT ${process.env.PORT || 5000}`)
);