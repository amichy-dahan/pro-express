
const morgan = require("morgan");
const express = require("express");

const app = express();
const PORT = 3000;

// john@example.com
//hashed_password_2
const router = require("./routes/router");
const authRouter = require("./routes/authRouter.js")
const { sequelize } = require("./db/models");

app.use(morgan("dev"));
app.use(express.json());

app.use('/recipes', router)
app.use("/auth",authRouter)


async function testConnection() {
    try{
             await sequelize.authenticate();
             console.log("dataBase connect!!!!!")
    }catch (error){
      console.log("Unable to connection to database" , error)
    }
}

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT,async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await testConnection();
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    });
});

