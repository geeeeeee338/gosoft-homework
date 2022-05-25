const jwt = require('jsonwebtoken')
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const checkLogin = (user, pass) => {
    if(user == "admin" && pass == "pass") return true
    return false
}

const jwtKey = "MY JWT KEY"
const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtKey)
    }
    catch {
        return false
    }
}

app.get('/', (req, res) => {
    let page = 'login'
    if(verifyToken(req.cookies.token)) page = 'home'
    res.sendFile(`${__dirname}/web/${page}.html`)
})

app.post('/login', (req, res) => {
    console.log(req.body)
    if(checkLogin(req.body.user, req.body.pass)){
        res.cookie('token', jwt.sign({user:"admin"}, jwtKey))
    }
    else {
        res.cookie('token', "")
    }
    return res.redirect('/')
})

app.post('/logout', (req, res) => {
    res.cookie('token', "")
    return res.redirect('/')
})

app.get('/css', (req, res) => {
    res.sendFile(`${__dirname}/web/style.css`)
})

app.get('/*', (req, res) => {
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});