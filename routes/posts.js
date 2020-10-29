const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//SUBMITS A POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET BACK ALL THE POST
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error });
    }
})

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
    //console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post)
    } catch (error) {
        res.json({ message: error });
    }
})

//UPDATE A POST
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatePost);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE SPECIFIC POST
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.postId })
        res.json(removePost)
    } catch (error) {
        res.json({ message: error });
    }
})

module.exports = router;




















//old technique
// router.post('/', (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });
//     post.save()
//         .then((data) => {
//             res.json(data)
//         })
//         .catch((err) => {
//             res.json({ message: "err" })
//         })
// })