const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://mongo:27017/foodData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

const Item = mongoose.model('Item', ItemSchema);

app.post('/items', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const newItem = new Item({ name, quantity });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
