function make_request(url, callback, method='GET', body = {}, headers = {}) {
    const request = new XMLHttpRequest();
    
    request.open(method, `http://localhost:8000${url}`);
    
    headers = Object.assign(headers, {
        'Content-Type': 'application/json'
    });

    Object.keys(headers).forEach((header) => {
        request.setRequestHeader(header, headers[header]);
    });

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4) {
            callback(request);
        }
    });

    request.send(JSON.stringify(body));
}

const submit = document.getElementById('submit');

if (submit) {
    submit.addEventListener('click', function() {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const f_name = document.getElementById('f_name');
        const l_name = document.getElementById('l_name');
        
        make_request('/register', function(request) {
            if (request.status === 200) {
                console.log(request.responseText);
            }
        }, 'POST', {
            email: email.value,
            password: password.value, 
            f_name: f_name.value, 
            l_name: l_name.value
        })
    });
}



// () => {
//     if (request.readyState === 4) {
//         const response = JSON.parse(request.responseText);
//         content.innerHTML = request.responseText;
//     }
// }