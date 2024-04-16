const express = require('express');
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth_Routes.js');
const messageRoutes = require('./routes/message_Routes.js');
const usersRoutes = require('./routes/users_Routes.js');
const cookieparser = require('cookie-parser');
const connectToMongoDb = require('./Db/connectToMongoDb.js');

const app =express();

dotenv.config();
app.use(express.json());// parse the files into json from req.body
app.use(cookieparser());
const PORT =process.env.PORT || 5000;

// app.get('/',(req,res)=>{
//     res.send('server is ready')
// })

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',usersRoutes)


app.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`listen to ${PORT}`)
});