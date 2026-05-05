

const mongoose  =  require('mongoose');
const bcrypt = require('bcryptjs');

    // User Schema Fields

const UserSchema = mongoose.Schema({
    name:({
        type: String,
        required: [true, 'Name is required'], 
        trim: true
    }), 
    email:({
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    }),
    password:({
        type: String,
        required: [true, 'Password is required'], 
        minlength: 6 
    }),

    mobile:({
        type: String,
        minlength: 10
    }),
     otp:({
        type: String,
        default: null
    }),

    isVerified:({
        type: Boolean,
        default: false
    }),

    otpExpiry:({
        type: Date, 
        default: null
    }),



     
     
},{timestamps: true});


UserSchema.pre('save', async function () {
    try {
        if (!this.isModified('password')) {
            return ;
        } 

        const saltRound = 12;
        this.password = await bcrypt.hash(this.password, saltRound);

        
    } catch (err) {
        throw err;
    }
});



module.exports = mongoose.model('User', UserSchema);