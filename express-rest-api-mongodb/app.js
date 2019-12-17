const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts.routes');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

const app = express();
app.use(bodyParser.json());
/**
 * By inserting cors in to the middleware the transaction of data between differnt APIs in different domains are allowed
 */
app.use(cors())
/**
 * We can use the subleveling of the routers or nested routing with the use of middleware
 */
app.use('/posts', postsRouter);

/**
 * BodyParser is used to converting the response to JSOn format by acting as the middleware
 */


/**
 * Middleware
//  */
// app.use('/posts', (req,res,next)=>{
//   console.log('Middleware is running on the homepage');
//   /**
//    * Use next() to render the response, otherwise it will be infintely in the middleware
//    */
//   next();
// });

/**
 * Routes: Straight routing without subleveling the routes
 */
// app.get('/', (req, res)=>{
//     res.send('We are on the home page');
//     console.log("Home Page");
// });

// app.post('/posts', (req, res)=>{
//     res.send('We are on the posts page');
// })

/**
 * Database connection
 */
mongoose.connect(process.env.DB_CONNECTION, 
                   { 
                     useNewUrlParser: true,
                     useUnifiedTopology: true, },
                  (err)=>{
                     if(err)
                       console.log(err);
                     else 
                       console.log('Connected!');
                   })
/**
 * Start listening to the server
 */
app.listen(3000);



