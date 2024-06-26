const express = require('express')
const dotenv = require('dotenv')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectToDb = require('./connectDb')
const cors = require('cors')
const path = require('path')
const app = express()

const staticRouter = require('./routers/staticRouters')
const userRouter = require('./routers/userRouters')
const blogRouter =require('./routers/blogRouters')
const commentRouter = require('./routers/commentRouters')
const {checkToken} = require('./middlewares/auth')


// configurations
dotenv.config()
connectToDb();
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(cookieParser())
app.use(checkToken)

// routers
app.use("/",staticRouter)
app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)

// listener
app.listen(process.env.PORT , () => {
    console.log("Server is running on PORT " + process.env.PORT);
})