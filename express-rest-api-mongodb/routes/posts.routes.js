const express = require('express');
const PostModel = require('../models/Post');
const router = express.Router();

/**
 * Synchronized method
 */
router.post('/', (req, res)=>{
    console.log(req.body);
     const post = new PostModel({
         title:req.body.title,
         description: req.body.description,
         date: req.body.date
     });

     post.save().then((data)=>{
         res.json({
             status:200,
             message: data
         });
     }).catch(err =>{
         res.json({
            status:err.code,
            message: err
        });
         console.log(`Error : ${err}`);
     })
});
/**
 * Asynchronized method
 */
router.get('/', async (req, res)=>{
    try{
        const posts = await PostModel.find();
        res.json(posts);

    }catch(err){
        res.json({
            message: err
        })
    }
});

/**
 * Create a post
 */
router.post('/async', async (req, res)=>{

    const post = new PostModel({
        title:req.body.title,
        description: req.body.description,
        date: req.body.date
    });
    
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        console.log(err);
    }
})

/**
 * Read a specific post
 */

 router.get('/:postId', async (req, res)=>{

    try{
        /**
         * http://localhost:3000/posts/thisistheparam
         * req.params.postId = thisistheparam
         */
        const postById = await PostModel.findById(req.params.postId);
        res.json(postById);
    }catch(err){
        res.json({
            status: err.code,
            message: err
        })
    }
 })

 /**
  * Delete a post
  */

  router.delete('/:postId', async (req, res)=>{
      try{
          const removedPost = await PostModel.deleteOne({_id: req.params.postId});
          res.json(removedPost);

      }catch(err){
         res.json({
             message:err
         })
      }
  })

  /**
   * Update a post
   */

   router.patch('/:postId', async(req, res)=>{
       try{
           const updatedPost = await PostModel.updateOne({
               _id: req.params.postId
           },{
               $set:{
                   title: req.body.title
               }
           });
           res.json(updatedPost); 
       }catch(err){
           res.json({
               message: err
           })
       }
   })

module.exports = router;
