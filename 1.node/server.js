/*
ให้ทำการสร้างไฟล์ server.js โดยให้ทำการระบุ port เป็น 2337 
และให้ทำการ print ข้อความ เป็น ชื่อ - นามสกุล ของตัวเอง และ ให้แสดง เวลา ในปัจจุบันด้วย
*/

const http = require('http');

const getDateTime = () => Date();

const server = http.createServer((req, res)=>{
    res.write('Laphatsana Suriyakeatdumrong: ' + getDateTime());
    res.end();
});

server.listen(2337);
