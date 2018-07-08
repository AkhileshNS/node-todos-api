var jwt = require('jsonwebtoken');

var data = {
    name: 'Akhilesh'
}

var token = jwt.sign(data, 'abcd123');
console.log(token);

var decoded = jwt.verify(token, 'abcd123');
console.log('decoded : ', decoded);