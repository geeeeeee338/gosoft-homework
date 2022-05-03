/*
ให้ทำการสร้างไฟล์ hw2.js 
ให้เขียนโปรแกรม โดยทำการกำหนด ข้อมูลตัวอักษร A-Z ไว้ใน array และให้ทำการ สลับตัวอักษร 
โดยที่สุดท้ายจะต้องแสดงผลในรูปแบบดังนี้ B A D C F E H G J I L K N M P O R Q T S V U X W Z Y 
(ให้ใช้วิธีเขียนโดยจะต้องมีการใช้ for loop,async await,try catch และ ห้ามใช ้ คำสั่ง console ในการ print ผลลัพธ์โดยตรง)
*/

const ตัวอักษรหลายๆตัว = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
]

const สลับตัวอักษร = (ตัวอักษรที่เป็นอาเร) => {
    let ผลลัพธ์ = ""
    for(let i=0; i< ตัวอักษรที่เป็นอาเร.length; i+=2){
        ผลลัพธ์ += ตัวอักษรหลายๆตัว[i+1] + " " + ตัวอักษรหลายๆตัว[i] + " ";
    }
    return ผลลัพธ์;
}

console.log(สลับตัวอักษร(ตัวอักษรหลายๆตัว))
