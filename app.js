const express =  require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({extended:true}))


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
    });
    app.post("/",function(req,res){
        var cityname = req.body.CityName;
        console.log(cityname)
        var query = cityname;
             const url = new URL("https://api.openweathermap.org/data/2.5/weather?q="+query+",Tamilnadu,91&appid=47ec456a52bd7c5d3eb9e0213aa2f094") 
 https.get(url,function(response){
    response.on("data",function(data){
        console.log(data);
        
        const weatherdata = JSON.parse(data);
        const icon =  weatherdata.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const desc = weatherdata.weather[0].description;
        const temp = weatherdata.main.temp;
        const desctxt = "The weather is currently " + desc;
        res.write("<h1>The Temperature in  " + query + " is " + temp+'&deg;' +"C</h1>")
      res.write("<p>" +desctxt +"</p>");
      res.write("<img src = "+imgurl+">");

    })
});
    });
  






app.listen(3000,function(){
    console.log("server running")
});