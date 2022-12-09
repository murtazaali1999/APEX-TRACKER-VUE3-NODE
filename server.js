const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" }); //environment path set

const app = express();
const PORT = process.env.PORT || 4504;
app.use(cors());

//morgan api logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

//the base uri + required params or extra uri
app.use("/api/v1/profile", require("./routes/profile"));

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
})
