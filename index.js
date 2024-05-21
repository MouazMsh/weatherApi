import express from "express"
import bodyParser from "body-parser"
import axios from "axios"


const port = 3000;
const app = express();
const ApiCurrent = "http://api.weatherapi.com/v1/forecast.json?key=f6ad33224f814bc0b3a81043242005&aqi=no&days=3";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    res.render("index.ejs");
});


app.post("/", async (req,res) => {
    try {
        const response = await axios.get(ApiCurrent +`&q=${req.body.city}`);
        const result = response.data ;
        res.render("index.ejs", {data : result});
    } catch (error) {
        res.render("index.ejs", {error: error.message,});
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
