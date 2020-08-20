const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const https = require('https')
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.emailAdress;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data)

  const url = "https://us17.api.mailchimp.com/3.0/lists/698ddf3530"
  const options = {
    method: "POST",
    auth: "sashka1:e24752b0781b0ec5662d303739e915c0-us17"
  }
  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    } else {
      res.sendFile(__dirname + '/failure.html')
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  // request.write(jsonData);
  request.end();

})
app.listen(process.env.PORT || 5000, function() {
  console.log('Server is UP');
})

app.post("/failure", function(req, res){
  res.redirect("/");
});

// e24752b0781b0ec5662d303739e915c0-us17

// 698ddf3530
