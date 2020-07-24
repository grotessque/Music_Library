const crypto = require('crypto');
const helpers = require('../lib/helpers');
const users = require('../db/users.json');
const session = require('../db/session.json');

const register = function (req, res) {
    // TODO: Перевіряти вхідні дані (валідація) + Чи є уже такий ЕМЕЙЛ + не зберігати пароль в явному вигляді
    const { email, password, f_name, l_name } = req.body;
    
    const user = Object.assign({}, {
        id: users.length + 1,
        ...req.body
    }, {
        password: createPasswordHash(password)
    });

    users.push(user);
    
    helpers.writeToJson('users.json', users);

    res.send(user);
}

const login = function(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.sendStatus(400);
        return;
    }

    const passwordHash = createPasswordHash(password);
    const user = users.filter(item => item.email === email && item.password == passwordHash);
    
    if (!user.length) {
        res.sendStatus(404);
        return;
    }

    const token = crypto.randomBytes(12).toString('hex');
    session.push({
        userId: user[0].id,
        token,
        createAt: new Date()
    });

    helpers.writeToJson('session.json', session);

    res.send({
        user: user[0],
        token
    });
}

function createPasswordHash(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

module.exports = {
    register,
    login
}