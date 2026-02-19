const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting', url)
mongoose.connect(url, {family:4})
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema ({
    content: {
        type: String,
        minLength: 5,
        required: true
    } ,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returenedObject) => {
        returenedObject.id = returenedObject._id.toString()
        delete returenedObject._id
        delete returenedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
