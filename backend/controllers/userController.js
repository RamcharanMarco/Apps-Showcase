const User = require("../models/userModel");
const UserDetails = require("../models/userDetails");
const bcrypt = require("bcrypt");

const editDetails = async (req, res) => {
  const id = req.params.id;
  const { type, experience, location, website, repo, photo } = req.body;
  try {
    const project = await UserDetails.findByIdAndUpdate(id, {
      type,
      experience,
      website,
      location,
      repo,
      photo,
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*const updateProject = async (req, res) =>{
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
*/

const getInfo = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await UserDetails.findOne({ user_id: user_id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//delete a word
const deleteUser = async (req, res) => {
  const user_id = req.user._id;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: user_id });
    if (deletedUser) {
      console.log("resume deleted");
      res.status(200).json(true);
    }
    if (!deletedUser) {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

/*const addTestimony = async (req, res) => {
    const user_id = req.user._id
    const {body, profession, name, surname} = req.body
    try{
        const user = await User.findOne({_id:user_id})
        let photo = user.photo
        const testimony = await Testimony.create({user_id,name,surname,profession, photo})
        res.status(200).json(testimony)
        console.log(testimony)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}

const deleteTestimony = async (req, res) =>{
    const user_id = req.user._id
    try{
        const test = await Testimony.findOneAndDelete({_id: user_id})
        if(test){
            res.status(200).json(true)
        }
        if(!test){
            res.status(200).json(false)
        }
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})

    }
}

const getTestimony = async (req, res) =>{
    const user_id = req.user._id
    try{
        const testimony = await Testimony.findOne({_id:user_id})
        res.status(200).json(testimony)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}*/

const changePassword = async (req, res) => {
  const _id = req.params.id;
  const { password } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      throw Error("user not exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newpassword = await User.findByIdAndUpdate(_id, { password: hash });
    if (newpassword) {
      res.status(200).json("password changed");
    } else {
      throw Error("something bad happened");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkPassword = async (req, res) => {
  const _id = req.params.id;
  const { password } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      throw Error("user not exist");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("incorrect password");
    }

    res.status(200).json("password ok");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getInfo,
  deleteUser,
  changePassword,
  editDetails,
  checkPassword,
};
