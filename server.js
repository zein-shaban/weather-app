const express = require("express");
const app = express();
const axios=require("axios");

app.set("view engine", "ejs");

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const api_key = "ab5d275d706eaa6008d80dc53a3ecbe7";
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},SY&appid=${api_key}`;

    try {
        const response = await axios.get(url);
        const location = response.data;
        const App_Url=`https://api.openweathermap.org/data/2.5/weather?lat=${location[0].lat}&lon=${location[0].lon}&appid=${api_key}`
        const weather= await axios.get(App_Url);
        res.render("index", { weather:weather.data, error: null });
    } catch (err) {
        console.error("Error fetching weather data:", err.message);
        res.render("index", { weather: null, error: "Error, Please try again" });
    }})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});