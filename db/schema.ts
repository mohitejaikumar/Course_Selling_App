import  mongoose  from 'mongoose';
const userSchema = new mongoose.Schema({

    username: String,
    password: String,
    // reference to main courses database
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }]
});

const adminSchema = new mongoose.Schema({

    username: String,
    password: String,

});

const courseSchema = new mongoose.Schema({

    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

// Define mongoose models

export const User = mongoose.model('Users', userSchema);
export const Admin = mongoose.model('Admins', adminSchema);
export const Course = mongoose.model('Courses', courseSchema);

