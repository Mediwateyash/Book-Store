const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookstore");

const book = mongoose.model("book", {
    title: {
        type: String,
         required: true
        },
    author:{
        type: String, 
        required: true
        },
    price : {
        type: Number, required: true
        },
    image: {
        type: String, 
        
        },
    description: {
      type : String
        }
})

module.exports = book