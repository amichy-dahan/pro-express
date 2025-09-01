
const morgan = require("morgan");
const express = require("express");

const app = express();
const PORT = 3000;
const router = require("./routes/router")

app.use(morgan("dev"));
app.use(express.json());

app.use('/recipes', router)

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    });
});

