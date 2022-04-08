import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    todos:[{
        id: String,
        task: String,
        date: {
            type: Date,
            default: Date.now()
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }]
})

const User = mongoose.model('User',userSchema);

export default User;