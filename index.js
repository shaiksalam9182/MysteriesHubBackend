const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./configs/configs');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

require('./routes/routes')(app);

var admin = require('firebase-admin');

var serviceAccount = require('./configs/naradh-175c1-firebase-adminsdk-1n0vs-fe09cfb73a.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)

})

mongoose.Promise = global.Promise;


//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connected to database');
}).catch(err => {
    console.log('Error in connecting to database' + err);
})






//running node server
app.listen(6110, () => {
    console.log('Server is running at port 6110');
})



app.get('/', (req, res) => {
    res.json({ 'Message': 'You made a get call' });
})
