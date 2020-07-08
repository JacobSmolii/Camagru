const db = require('../Database/dbConfig');
const { select, where } = require('../Database/dbConfig');

module.exports = {
    createAccount,
    loginUser,
    get,

    createPicture,
    getUserPicture,
    getAllPictures,
    findPictureById,
    deletePicture,

    createComment,
    // findCommentById,
    getCommentsByPicId,
    deleteComment,

    createLike,
}

function createAccount(user) {

    return db('account')
        .insert(user);
}

function get() {
    return db('account')
}

function loginUser(email) {
    return db('account')
        .where({email: email})
        .first()
}

// pictures of the user

function getUserPicture(userId) {
    return db('picture')
        .where({account_id: userId})
}

function findPictureById(picture_id) {
    return db("picture")
        .where({ id: picture_id })
        .first()
}

function createPicture(userId, {picture}) { // maybe need to be destructured

    const data = {
        account_id: userId,
        picture
    }

    return db('picture')
        .where({account_id: userId})
        .insert(data)
}

function getAllPictures() {
    return db('picture');
}

function deletePicture(picture_id) {
    return db('picture')
        .where({ id: picture_id})
        .del()
}

// comments

function createComment(account_id, picture_id, comment) {
    const newComment = {
        account_id,
        picture_id,
        comment
    }
    // console.log(newComment)
    return db('comments')
        .insert(newComment)
}

function findCommentById(comment_id) { // not sure if it works properly
    return db('comments')
        .where({ id: comment_id})
        .first()
}

function getCommentsByPicId(picture_id) {
    return db('comments')
        .where({ picture_id })
}

function deleteComment(comment_id) {
    return db('comments')
        .where({ id: comment_id})
        .del()
}

// likes

function createLike(account_id, picture_id) {
    // const likeNew = {
    //     account_id,
    //     picture_id
    // }

    return db('likes')
        .insert({ account_id, picture_id })
}









