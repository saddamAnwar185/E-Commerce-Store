const { model, Schema } = require('mongoose')

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN"]
    }
}, { timestamps: true })

const Users = model("Users", UsersSchema)

module.exports = Users