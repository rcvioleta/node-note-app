const fs = require('fs')
const path = require('path')

const FILE_STORAGE = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'notes.json'
)

exports.getIndex = (req, res) => {
    res.render('home/index', {
        pageTitle: 'Home'
    })
}

exports.createNote = (req, res) => {
    const title = req.body.title
    const content = req.body.content

    const date = new Date()
    const month_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const created_at = `${month_arr[month]} ${day}, ${year}`

    fs.readFile(FILE_STORAGE, (err, data) => {
        let notes = [];
        const new_notes = {
            title,
            content,
            created_at
        }
        if (!err) notes = JSON.parse(data)
        notes.push(new_notes)

        fs.writeFile(FILE_STORAGE, JSON.stringify(notes), err => {
            if (err) res.status(500).json({ message: 'Unable to add note' })
            else res.status(200).json({ message: 'Note added successfully' })
        })
    })
}

exports.getNotes = (req, res) => {
    fs.readFile(FILE_STORAGE, (err, data) => {
        if (!err) res.status(200).json(JSON.parse(data))
        else res.status(204).json({ error: "No notes found" });
    })
}

exports.removeNote = (req, res) => {
    const title = req.body.title

    fs.readFile(FILE_STORAGE, (err, data) => {
        const parsedNotes = JSON.parse(data)
        const new_notes = parsedNotes.filter(note => {
            return note.title !== title
        })

        fs.writeFile(FILE_STORAGE, JSON.stringify(new_notes), err => {
            if (err) res.status(500).json({ message: 'Unable to remove note' })
            else res.status(200).json({ message: 'Deleted note successfully' })
        })
    })
}