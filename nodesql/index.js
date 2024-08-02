const express = require('express')
const {createItem, readItems, updateItems, deleteItem} =require('./crud')
const app = express();

app.use(express.json())

app.get('/items', (req,res) => {
    readItems((err, rows) => {
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(200).json(rows)
        }
    })
})

app.post('/items', (req,res) => {
    const {name, description} = req.body
    createItem(name, description, (err, data)=> {
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(201).send('Item is added ID: ${data.id}')
        }
    })
})

app.listen(3000, () => {
    console.log("Server is running")
})