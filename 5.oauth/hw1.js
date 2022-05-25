const express = require('express');
const { createPool } = require('mysql2')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());

const sql = createPool({
    charset: "utf8",
    namedPlaceholders: true,
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "gosoft_rookie_hw"
})

const jwtKey = "MY JWT KEY"
const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtKey)
    }
    catch {
        return false
    }
}

app.use((req, res, next) => {
    if(req.path == "/login") return next()
    const token = (req.headers.authorization + "").split(' ')[1]
    if(verifyToken(token)){
        return next()
    }
    return res.status(400).json({
        msg: "unauthorized",
    })
})


const checkLogin = (user, pass) => {
    if(user == "admin" && pass == "pass") return true
    return false
}

app.post('/login', (req, res) => {
    if(!checkLogin(req.body.user, req.body.pass)){
        return res.json({
            msg: "unauthorized",
        })
    }
    return res.json({
        msg: "ok",
        data: jwt.sign({user:"admin"}, jwtKey)
    })
})

app.get('/getData', (req, res) => {
    sql.query('select * from employee', (err, value) => {
        if (err) {
            console.log({ err })
            return res.status(400).json({
                msg: "error",
            })
        }
        res.json({
            msg: "ok",
            data: value
        })
    })
})

app.post('/newData', (req, res) => {
    if (!req.body.firstname
        || !req.body.lastname
        || !req.body.position
        || !req.body.tel
        || !req.body.email
    ) {
        return res.status(400).json({ msg: "error input" })
    }

    const sql_ = 'insert into employee (fname, lname, pos, tel, email)'
        + `value (:fnane, :lname, :pos, :tel, :email)`

    sql.query(sql_, {
        fnane: req.body.firstname,
        lname: req.body.lastname,
        pos: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }, (err, value) => {
        if (err) {
            console.log({ err })
            if (err.code == "ER_DUP_ENTRY") {
                return res.status(400).json({
                    msg: "error duplicate",
                })
            }
            return res.status(400).json({
                msg: "error",
            })
        }
        res.json({
            msg: "ok"
        })
    })
})

app.delete('/deleteData', (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ msg: "error input" })
    }

    const sql_ = 'delete from employee where id = :id'

    sql.query(sql_, { id: req.body.id }, (err, value) => {
        if (err) {
            console.log({ err })
            return res.status(400).json({
                msg: "error",
            })
        }
        if (value.affectedRows == 0) {
            return res.status(400).json({
                msg: "error not found",
            })
        }
        res.json({
            msg: "ok"
        })
    })
})

app.put('/updateData', (req, res) => {
    if (
        !req.body.id ||
        !req.body.position ||
        !req.body.tel ||
        !req.body.email
    ) {
        return res.status(400).json({ msg: "error input" })
    }

    const sql_ = 'update employee set pos = :pos, tel = :tel, email = :email where id = :id'

    sql.query(sql_, { 
        id: req.body.id,
        pos: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }, (err, value) => {
        if (err) {
            console.log({ err })
            if (err.code == "ER_DUP_ENTRY") {
                return res.status(400).json({
                    msg: "error duplicate",
                })
            }
            return res.status(400).json({
                msg: "error",
            })
        }
        if (value.affectedRows == 0) {
            return res.status(400).json({
                msg: "error not found",
            })
        }
        res.json({
            msg: "ok"
        })
    })
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});
