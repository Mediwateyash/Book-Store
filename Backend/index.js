const mongoose = require("mongoose");
const Book = require("./book"); // Renamed to Book for clarity
const express = require("express");

mongoose.connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

const app = express();
const port = 3000;
app.use(express.json());

//middleware cors 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});



// Route to save a single book
app.post("/addbook", async (req, res) => {
    try {
        const book = new Book(req.body); // Use the Book model
        const savedBook = await book.save(); // Save the book
        res.status(201).send(savedBook);
    } catch (err) {
        console.error("Error saving book:", err);
        res.status(500).send("Error saving book");
    }
});

// Route to save multiple books
app.post("/addbooks", async (req, res) => {
    try {
        const savedBooks = await Book.insertMany(req.body); // Use the Book model
        res.status(201).send(savedBooks);
    } catch (err) {
        console.error("Error saving books:", err);
        res.status(500).send("Error saving books");
    }
});

// Route to get all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find(); // Use the Book model
        res.status(200).send(books);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send("Error fetching books");
    }
});

// Route to get a single book by ID
app.get("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const singleBook = await Book.findById(id); // Use the Book model
        if (!singleBook) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send(singleBook);
    } catch (err) {
        console.error("Error fetching book:", err);
        res.status(500).send("Error fetching book");
    }
});

// route to update the book
app.put("/updatebook/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true }); // Use the Book model
        if (!updatedBook) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send(updatedBook);
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Error updating book");
    }
})

//route to delete 
app.delete("/deletebook/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id); // Use the Book model
        if (!deletedBook) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send(deletedBook);
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).send("Error deleting book");
    }
})
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
