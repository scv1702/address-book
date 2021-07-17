const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

// DB schema
const contactSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String },
    phone: { type: String }
});
const Contact = mongoose.model('contact', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.redirect('/contacts');
});

// Contacts - Index 
app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) return res.json(err);
        res.render('contacts/index', { contacts: contacts });
    });
});

// Contacts - New
app.get('/contacts/new', (req, res) => {
    res.render('contacts/new');
});

// Contacts - create
app.post('/contacts', (req, res) => {
    Contact.create(req.body, (err, contact) => {
        if (err) return res.json(err);
        res.redirect('/contacts');
    });
});

// Port setting
var port = 3000;
app.listen(port, () => {
    console.log('server on! http://localhost:' + port);
});