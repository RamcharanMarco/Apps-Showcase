const Comment = require('../models/commentModel')

const getCommentsByProjectId = async (req, res) =>{
    const {id} = req.params
    try{
        const comment = await Comment.find({project_id:id})
        res.status(200).json(comment)
        console.log(comment)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}

  const CreateComment = async (req, res) => {
    const {id} = req.params
    const {name, body} = req.body

    try {
        const comment = await Comment.create({project_id:id, name, body})
        res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



module.exports = {
    getCommentsByProjectId,
    CreateComment
}