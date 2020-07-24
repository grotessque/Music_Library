const express = require('express');
const cors = require('cors');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');

// Controllers
const auth = require('./controllers/auth');

// Main app
const app = express();

app.use(cors());

// Serve static files
app.use(express.static('static'));

// Register views (templates)
app.engine('hbs', expressHbs({
    layoutsDir: './views',
    defaultLayout: 'index',
    extname: 'hbs'
}))

app.set('view engine', 'hbs');

// Parse BODY for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log(`--> ${req.method}: ${req.originalUrl}`);
    next();
    // console.log(`<-- ${res.method}: ${res.originalUrl} - ${res.status}`);
});

app.get('/', function(req, res) {
    res.render('index.hbs', {
        title: 'Music Library'
    });
});

app.get('/login', function(req, res) {
    res.render('login.hbs', {
        title: 'Login',
        not_home: true,
        authorized: true
    });
});

app.get('/music', function(req, res) {
    res.render('music.hbs', {
        title: 'Music',
        not_home: true,
        authorized: true
    });
});

app.get('/register', function(req, res) {
    res.render('reg.hbs', {
        title: 'Register',
        not_home: true,
        authorized: true
    })
});

app.post('/login', auth.login);

app.post('/register', auth.register);

// app.get('/api/login', function(req, res) {
//     const { email, password } = req.query;
//     console.log(email, password);

//     const users = [{
//         email: 'denis@mail.com',
//         password: '123123',
//         secretInfo: GetRandomInt()
//     }, {
//         email: 'test@mail.com',
//         password: '123123',
//         secretInfo: 'Info 2'
//     }]
//     const [result] = users.filter(user => {
//         return user.email === email;
//     })
//     console.log(result)
//     res.render(path.join(__dirname + '/content.hbs'), {
//         email: result.email,
//         secretInfo: result.secretInfo
//     });

//     function GetRandomInt(){
//         max = 9999999;
//         min = 100;
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min)) + min;
//     }

//     res.sendFile(path.join(__dirname + '/content.hbs'))
// });

// app.post('/api/login', function(req, res) {
//     console.log(req.body)
//     const { email } = req.body;

//     const [result] = users.filter(user => {
//         return user.email === email;
//     });

//     res.send(result);
// });


app.listen(8000, function() {
    console.log('listen on http://localhost:8000')
});
