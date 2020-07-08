const router = require('express').Router()
const db = require('../DB_modules/account_modules');

// Create post
// to make a picture i need to verify the token and take the info from the token about the user
// from the known user i will know the id of the user and everything else
router.post('/', (req, res) => { // creating the picture
    const {id} = req.token; // token already in "req", we put it "restrict_auth_middleware"
    const data = req.body;

    db.createPicture(id, data)
        .then(() => {
            res.status(201).json({ message: "picture has been created" });
        })
        .catch(err => {
            res.status(500).json({ message: "there is some error pop up"})
        })
})

// fetch all the posts of the loged in user
router.get('/', (req, res) => {

    db.getUserPicture(req.token.id)
        .then(pictures => {
            res.status(200).json(pictures);
        })
        .catch(err => {
            res.status(500).json({ error: "cannot fetch the pictures of the user" });
        })
})

// delete post ( user's post only)
router.delete('/:id', (req, res) => {
    try {
        const {id} = req.params;
        db.deletePicture(id)
            .then(() => {
                res.status(200).json({ message: "The post has been deleted successfully" })
            })
            .catch(err => {
                res.status(500).json({ error: "There is some error to delete your post" })
            })
    } catch {
        res.status(500).json({ error: "Error, try again" })
    }
})

// Create comment to the post
router.post('/:id/comment', (req, res) => {
// need to write the middleware to make sure the comment is not empty
    const account_id = req.token.id;
    const picture_id = req.params.id;
    const {comment} = req.body;

    db.createComment(account_id, picture_id, comment)
        .then(() => res.status(201).json({ message: "Thank you for the comment" }))
        .catch(() => res.status(500).json({ message: "You cannot leave the comment" }))

})

router.get('/:id/comment', (req, res) => {
    const picture_id = req.params.id;

    db.getCommentsByPicId(picture_id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(() => res.status(500).json({ error: "Cannot fetch comments at this time" }))
})

router.delete('/:id/comment/:comment_id', (req, res) => {
    const picture_id = req.params.id;
    const comment_id = req.params.comment_id;

    db.findPictureById(picture_id)
        .then(picture => {
            if (!picture)
                res.status(204).json({ error: "Picture doesn't exist" })
            db.deleteComment(comment_id)
                .then(() => res.status(200).json({ message: "Comment has been deleted successfully" }))
        })
        .catch(() => res.status(204).json({ error: "Sorry, looks like the picture doesn't exist anymore" }))
})

router.post('')

module.exports = router;
