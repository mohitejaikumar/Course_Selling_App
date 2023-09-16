import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mohitejaikumar:k4PT75pWcsdUNxCw@cluster0.krcxiuh.mongodb.net/');
app.use('/admin', adminRouter);
app.use('/users', userRouter);



app.get('/', (req, res) => {
  res.json({
    message: "Welcome To Course Cracker",
  })
})
// Connect to MongoDb

app.listen(3000, () => console.log('Server running on port 3000'));