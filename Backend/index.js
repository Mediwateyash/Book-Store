const mongoose = require("mongoose");
const book = require("./book");
const express = require("express");

mongoose.connect("mongodb://localhost:27017/bookstore") 


const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");

})

//routes for save book
app.post("/addbook", async (req, res) => {
    try{
        const books = new book(req.body);
        const saved_book = await books.save();
        res.send(saved_book);
    }catch(err){
        console.log(err);
        res.status(500).send("Error saving book");
    }

})

app.get("/books", async (req, res) => {
    try{
        const books = await book.find();
        res.send(books);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching books");
    }
})


app.listen(port, () => {
    console.log(`Server is running on port  ${port}`);
});