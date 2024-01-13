const Project = require('../models/projectModel')
const UserDetails = require('../models/userDetails')
const UserModel = require('../models/userModel')


const mongoose = require('mongoose')

//get single
const getProfile = async (req, res) =>{
    const user_id = req.params.id
    try{
        const projects = await Project.find({user_id})
        const userDetails = await UserDetails.findOne({user_id})
        const userModel = await UserModel.findOne({_id:user_id})

        res.status(200).json({projects,userDetails, userModel})
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//get single
const getProject = async (req, res) =>{
    const _id = req.params._id

    try{
        const projects = await Project.findOne(_id)
            let views = parseInt(projects.views) + 1
            const views2 = await Project.findByIdAndUpdate(req.params.id,{views})
            console.log(views2)
        res.status(200).json(projects)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//get single
const getProjects = async (req, res) =>{
    try{
        const projects = await Project.find({})
        res.status(200).json(projects)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const searchProjects = async (req, res) =>{
    const searchQuery = req.query.query
    let queryFilter = searchQuery && searchQuery !== 'all' ? {
        type:{
            $regex : searchQuery,
            $options : 'i',
        }
    }
    :
    {}
    try{
        const projects = await Project.find({...queryFilter}).sort({createdAt: -1})
        res.status(200).json(projects)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}
module.exports = {
    getProject,
    getProjects,
    getProfile,
    searchProjects
}


/*
const Job = require('../models/JobModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')



//get single employer
const getAllJobs = async (req, res) =>{
    console.log('user', req.query)
    const page = parseInt(req.query.page)
    const limit = 10
    const skip = page*limit -10
    try{
        const count = await Job.find().count()
        console.log(count)
        const jobs = await Job.find().sort({createdAt: -1}).skip(skip).limit(limit)
        res.status(200).json({jobs,count})
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const searchJobs = async (req, res) =>{
    const searchQuery = req.query.query
    const location = req.query.location
    let queryFilter = searchQuery && searchQuery !== 'all' ? {
        title:{
            $regex : searchQuery,
            $options : 'i',
        }
    }
    :
    {}
    let locationFilter = location && location !== 'all' ? {location} : {}
    try{
        const jobs = await Job.find({...queryFilter, ...locationFilter}).sort({createdAt: -1})
        res.status(200).json(jobs)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    getAllJobs,
    searchJobs
}
*/


/*
function Home() {
  const [jobs, setJobs] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [job, setJob] = useState("");
  const [val, setVal] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [no, setNo] = useState(0);
  const [page, setPage] = useState(null);

  const displayJob = (id) => {
    const result = jobsList.find((x) => x._id === id);
    setJob(result);
  };

  const getJobs = async (page) => {
    setPage(page);
    try {
      console.log("fetching data");
      const res = await fetch(`${BACKEND}/api/jobs?page=${page}`);
      const json = await res.json();
      setJobs(json.jobs);
      setJobsList(json.jobs);
      setJob(json.jobs[0]);
      setNo(json.count);
      window.scrollTo(200,0)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
    setPage(1);
  }, []);

  const search = async (e) => {
    e.preventDefault();
    let query = val;
    let loc = location;
    if (val === "") {
      query = "all";
    }
    try {
      console.log("fetching data");
      const res = await fetch(
        `${BACKEND}/api/jobs/search/?query=${query}&location=${loc}`
      );
      const json = await res.json();
      setJobs(json.jobs);
      setJobsList(json.jobs);
      setJob(json[0]);
      console.log(json.jobs[0]);
    } catch (error) {
      console.log(error);
    }
  };
*/