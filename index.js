const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(express.static('static'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/templates');

hbs.registerPartial('index', 'index'); 

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render(path.join(__dirname + '/templates/index.hbs'), {
        title: 'Music Library'
    });
});

app.get('/login', function(req, res) {
    res.render(path.join(__dirname + '/templates/auth/login.hbs'), {
        title: 'Login',

    })
});

app.get('/register', function(req, res) {
    res.render(path.join(__dirname + '/templates/auth/reg.hbs'), {
        title: 'Register'
    })
});

app.post('/login', function(req, res) {
    res.send({});
});

app.post('/register', function(req, res) {
    // TODO: Перевіряти вхідні дані (валідація) + Чи є уже такий ЕМЕЙЛ + не зберігати пароль в явному вигляді
    const { login, password, f_name, l_name } = req.body;
    const db = require('./db/users.json');

    const user = {
        id: db.length + 1,
        ...req.body
    };

    db.push(user);

    fs.writeFile('./db/users.json', JSON.stringify(db, null, '\t'), (err) => {
        if (err) console.err(err);
    });

    res.send(user);
});

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