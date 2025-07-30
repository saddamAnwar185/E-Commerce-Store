const {Schema, model} = require('mongoose')

const headerSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    image: {
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }
})

const Header = model("Header", headerSchema)

module.exports = Header