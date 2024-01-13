const Project = require('../models/projectModel')
const User = require('../models/userModel')

const getProject = async (req, res) =>{
    const _id = req.params.id
    try{
        const project = await Project.findOne({_id})
        res.status(200).json(project)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}

const getProjects = async (req, res) =>{
    const user_id = req.params.id
    try{
        const projects = await Project.find({user_id})
        res.status(200).json(projects)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}


//delete a word
const deleteProject = async (req, res) =>{
    const _id = req.params.id
    try{
        const project = await Project.findOneAndDelete({_id})
        if(project){
            res.status(200).json(true)
        }
        if(!project){
            res.status(200).json(false)
        }
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})

    }
}

/*const editForm = async (req, res) => {
    const id = req.params.id
    const {email, heading,nameInput,emailInput,bodyInput} = req.body
    try{
        const form = await Form.findOneAndUpdate({_id:id},{$set:req.body})
        res.status(200).json(form)
        console.log('form',form)
    }catch(error){
        console.log(error)
        res.status(400).json({error : error.message})
    }
}*/

const updateProject = async (req, res) =>{
    const _id = req.params.id
    console.log('edit route hit')
    const {name,description,repo,demo,type,technologies} = req.body
    try{
     const project = await Project.findByIdAndUpdate(_id,{name,description,repo,demo,type,technologies})
        res.status(200).json(project)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const deleteAllProjects = async (req, res) => {
    const id = req.params.id;
    try {
      const projects = await Project.deleteMany({ user_id: id });
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    getProject,
    getProjects,
    deleteProject,
    updateProject,
    deleteAllProjects
}