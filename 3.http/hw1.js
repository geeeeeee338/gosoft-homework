/*
ให้ทำการสร้าง File hw1.js 
ให้ทำการสร้างการเก็บข้อมูล พนักงานในบริษัท โดยจะต้องใช้ REST API (GET,PUT,POST,DELETE) 

โดยในกรณีของการ Update และ Delete ถ้าหากว่าส่งข้อมูล id เข้ามาผิดจะต้องทำการ Return เป็น HTTP Response 400 และบอกว่าข้อมูลไม่ถูกต้อง 
โดยข้อมูลของพนักงานกำหนดให้รับข้อมูลดังนี้ (ชื่อ,นามสกุล,รหัสพนักงาน,ตำแหน่ง,เบอร์ติดต่อ,email)

ถ้ามีข้อมูล email และ เบอร์โทรศัพท์อยู่ในระบบอยู่แล้วจะต้องไม่สามารถสร้างข้อมูลใหม่มาทับซ้อนได้และ ห้ามแก้ไขข้อมูล ชื่อ นามสกุล 
ถ้าหากเข้าเงื่อนไขเหล่านี้ให้ Return เป็น HTTP Response 400 และ ทำให้ทำการสร้าง Ngrok เพื่อใช้สำหรับการทดสอบผลลัพท์ได้
*/

const express = require('express');

const app = express();
app.use(express.json());

let employee_data = []

const getEmployeeIndexById = (id) => {
    for (let i = 0; i < employee_data.length; i++) {
        if (employee_data[i].id == id) return i;
    }
    return null;
}

const getEmployeeIndexByTel = (tel) => {
    for (let i = 0; i < employee_data.length; i++) {
        if (employee_data[i].tel == tel) return i;
    }
    return null;
}

const getEmployeeIndexByEmail = (mail) => {
    for (let i = 0; i < employee_data.length; i++) {
        if (employee_data[i].email == mail) return i;
    }
    return null;
}

app.get('/getData', (req, res) => {
    res.json({
        msg: "ok",
        data: employee_data
    })
})

app.post('/newData', (req, res) => {
    if (!req.body.id) { return res.status(400).json({ msg: "error input" }) }
    if (!req.body.firstname) { return res.status(400).json({ msg: "error input" }) }
    if (!req.body.lastname) { return res.status(400).json({ msg: "error input" }) }
    if (!req.body.position) { return res.status(400).json({ msg: "error input" }) }
    if (!req.body.tel) { return res.status(400).json({ msg: "error input" }) }
    if (!req.body.email) { return res.status(400).json({ msg: "error input" }) }

    if (getEmployeeIndexById(req.body.id) != null) { return res.status(400).json({ msg: "deplicate employee" }) }
    if (getEmployeeIndexByTel(req.body.tel) != null) { return res.status(400).json({ msg: "deplicate employee" }) }
    if (getEmployeeIndexByEmail(req.body.email) != null) { return res.status(400).json({ msg: "deplicate employee" }) }

    const newData = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        position: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }

    console.log(newData)

    employee_data.push(newData)

    res.json({
        msg: "ok"
    })
})

app.delete('/deleteData', (req, res) => {
    if (!req.body.id) { return res.status(400).json({ msg: "error input" }) }

    const i = getEmployeeIndexById(req.body.id);

    if (i != null) {
        employee_data.splice(i, 1)
        return res.json({
            msg: "ok"
        })
    }

    return res.status(400).json({ msg: "employee not found" })
})

app.put('/updateData', (req, res) => {
    if (!req.body.id) { return res.status(400).json({ msg: "error input" }) }
    if (
        !req.body.position &&
        !req.body.tel &&
        !req.body.email
    ) {
        return res.status(400).json({ msg: "error input" })
    }

    const i = getEmployeeIndexById(req.body.id);

    if (i != null) {
        if(req.body.position) employee_data[i].position = req.body.position
        if(req.body.tel) employee_data[i].tel = req.body.tel
        if(req.body.email) employee_data[i].email = req.body.email

        return res.json({
            msg: "ok"
        })
    }

    return res.status(400).json({ msg: "employee not found" })
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});
