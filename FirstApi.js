const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());

app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );

app.post("/createRoom", (request, response) =>{
    const body = request.body;
    //console.log(body);
    const headerConfig = { headers: { 'Content-Type': 'application/json', 'authorization': request.headers.authorization, }, };
    axios.post('https://api.daily.co/v1/rooms', body, headerConfig)
      .then((resp) => {
        //console.log(resp.data);
        response.send(resp.data);
      }, (error) => {
        console.log(error);
      });
})

app.delete("/deleteRoom/:room", (request, response) =>{
    const room = request.params.room;
    //console.log(room);
    const headerConfig = { headers: { 'Content-Type': 'application/json', 'authorization': request.headers.authorization, }, };
    axios.delete(`https://api.daily.co/v1/rooms/${room}`, headerConfig)
      .then((resp) => {
        console.log(resp.data);
        response.send(resp.data);
      }, (error) => {
        console.log(error);
        //response.send(error.message);
      });
})


// curl -H "Content-Type: application/json" \
//      -H "Authorization: Bearer $TOKEN" \
//      -XPOST -d \
//      '{"properties":{"exp":'`expr $(date +%s) + 3600`'}}' \
//      https://api.daily.co/v1/rooms/
        

