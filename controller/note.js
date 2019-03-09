const fs = require('fs')
const path = require('path')

const FILE_STORAGE = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'notes.json'
)

exports.getIndex = (req, res) =>{
    res.render('home/index', {
        pageTitle: 'Home'
    })
} 

exports.createNote = (req, res) => {
    const title = req.body.title
    const content = req.body.content
    
    fs.readFile(FILE_STORAGE, (err, data) => {
        let notes = [];
        const newNotes = {
            title,
            content
        }
        if (!err) notes = JSON.parse(data)
        notes.push(newNotes)
        fs.writeFile(FILE_STORAGE, JSON.stringify(notes), err => {
            if (err) console.log('Cannot add this note!')
            else res.redirect('/note')
        })
    })
}

exports.getNotes = (req, res) => {
    fs.readFile(FILE_STORAGE, (err, data) => {
        if (!err) res.status(200).json(JSON.parse(data))
        else res.status(204).json({error: "No notes found"});
    })
}

exports.removeNote = (req, res) => {
    const title = req.body.title
    fs.readFile(FILE_STORAGE, (err, data) => {
        const parsedNotes = JSON.parse(data)
        const newNotes = parsedNotes.filter(note => {
            return note.title !== title
        })

        // console.log('New Notes: ', newNotes)
        // console.log('Picked Title: ', title)
        // console.log('Request: ', req)

        fs.writeFile(FILE_STORAGE, JSON.stringify(newNotes), err => {
            if (err) res.status(500).json({ message: 'Unable to remove note' })
            else res.status(200).json({ message: 'Deleted note successfully' })
        })
    })
}