const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connectToDb = require("./config/db");
connectToDb();

const rewardRoutes = require("./routes/reward.route");
app.use("/api/rewards", rewardRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

