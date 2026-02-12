const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)    
}

const password = process.argv[2]

const url = `mongodb+srv://zhuyinhe:${password}@fso-dev.dxnadzp.mongodb.net/noteApp?appName=fso-dev`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family:4})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
    content: "Browser can execute only JavaScript",
    important: false
})
const note2 = new Note({
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
})

// Promise.all([note1.save(), note2.save()])
//     .then(() => {
//         console.log('All notes saved')
//         mongoose.connection.close()
//     })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({important:true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})