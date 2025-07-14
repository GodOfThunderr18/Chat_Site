const express=require('express');
const app=express();
const path=require('path');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const mongoose = require('mongoose');
const Chat=require("./models/chat.js");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const methodOverride=require('method-override');
app.use(methodOverride('_method'));





app.listen(8080,()=>{
    console.log("server is listening");
});


async function main() { 
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); //whatsapp db
} 


main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));




 //Index route
 app.get("/chats",async (req,res)=>{
    let chats=await Chat.find({}); //all mongoose func are async funcs so use await
    
    res.render("index.ejs",{chats});
 })


 //Create route
 app.get("/chats/new",(req,res)=>{
    res.render('new.ejs');
 })

 app.post("/chats",(req,res)=>{
     let {from,to,message}=req.body;
     let newChat=new Chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date()
     });
     newChat.save().then((res)=>{console.log("chat was saved")}).catch((err)=>{console.log(err)}); //since we used then so need to use await here
     res.redirect("/chats"); 
 })



 //Update
 app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
 })

 app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    await Chat.findByIdAndUpdate(id,{message:newMsg},{runValidators:true,new:true});
     res.redirect("/chats");

 });


 //destroy
 app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
 })
