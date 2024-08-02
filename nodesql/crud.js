const db = require('./database')


const createItem = (name, description, callback) => {
    const sql = 'INSERT INTO items (name, description) VALUES (?, ?)'
    db.run(sql, [name, description], function(err) {
        callback(err, {id: this.lastID})
    })
}


const readItems = (callback) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, [], callback)
} 

const updateItem = (id, name, descroption, callback) => {
    const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?'
    db.run(sql, [name, description, id], callback)
}


const deleteItem = (id, callback) => {
    const sql = 'DELETE FROM items WHERE id = ?'
    db.run(sql, id, callback)
}

module.exports = {createItem, readItems, updateItem, deleteItem}