const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); 
mongoose.connect(process.env.MONGO_DB); 
const db = mongoose.connection; 

db.once('open', () => {
    console.log('DB connected');
});

db.on('error', (err) => {
    console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

// Port setting
var port = 3000;
app.listen(port, () => {
    console.log('server on! http://localhost:' + port);
});