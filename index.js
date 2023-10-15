import express from "express";
import bodyParser from "body-parser";
import twilio from 'twilio';

const client = twilio('ACc2c74bc028685f6a52b51126bb58a8b1', 'ff4f8508e449d04346ec2cd22afaf203');
const app = express();
const port = 3000;
const myList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs"); // Set EJS as the template engine

app.get("/", (req, res) => {
    res.render("index.ejs", { myList });
});

app.post("/submit", (req, res) => {
    var tasks = req.body.ProductDetail;
    var number = req.body.Prices;
    var numberToString = number.toString();
    var both = tasks + " for Rs " + numberToString;
    var phoneNumber = req.body.PhNo;
    var phoneNumberr = req.body.PhNo2;
    console.log(phoneNumber);
    console.log(phoneNumberr);
    sendTextmessage(phoneNumber, both);
    sendTextmessage2(phoneNumberr, both);
    myList.push(both);
    res.redirect("/"); // Redirect back to the home page
});

app.post("/pass", (req, res) => {
    var passs = req.body["password"];
    if(passs==="dahsra"){
        res.render("database.ejs");
    }else{
        res.redirect("/");
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function sendTextmessage(to, message) {
    client.messages.create({
        body: message,
        to: '+91'+to,
        from: '+15719827933'
    }).then(message => console.log('Message status:', message.status))
    .catch(error => console.log(error))
}
function sendTextmessage2(to, message) {
    client.messages.create({
        body: message,
        to: '+91'+to,
        from: '+15719827933'
    }).then(message => console.log('Message status:', message.status))
    .catch(error => console.log(error))
}
