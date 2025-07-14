const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

async function main() { 
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); //whatsapp db
} 


main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));


let allChats=[
    {
        from:"nik",
        to:"ker",
        message:"ok Java script",
        created_at:new Date()

    },
    {
        from:"kirat",
        to:"shydev",
        message:"teache me solana",
        created_at:new Date()
    },
    {
        from:"darsh",
        to:"sush",
        message:"teache me ML",
        created_at:new Date()
    }
]

Chat.insertMany(allChats);