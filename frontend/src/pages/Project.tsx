import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/projectPage.css";
import ProjectsNavbar from "../components/ProjectsNavbar";
import Comment from "../components/Comment";


const Project = () => {
  const [photo, setPhoto] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const [demo, setDemo] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [lib, setLib] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const [db, setDb] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [hosting, setHosting] = useState<string>("");
  const [del, setDel] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [userid, setUserid] = useState<string>("");
  const [views, setViews] = useState<number>(0);



  const { id:id2 } = useParams();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [edit, setEdit] = useState<any>(false);

  const [comment, setComment] = useState(false)

  const [comments, setComments] = useState<{ name: string; body: string }[]>(
    []
  );

  const getData = async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/public/projects/${id2}`
    );

    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      setLoading(false);
      setData(json);
      setPhoto(json.photo);
      setName(json.name);
      setDescription(json.description);
      setRepo(json.repo);
      setDemo(json.demo);
      setType(json.type);
      setLib(json.lib);
      setLang(json.lang);
      setDb(json.db);
      setCss(json.css);
      setHosting(json.hosting);
      setId(json._id);
      setUserid(json.user_id);
      setViews(json.views)

    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleComment = (e: any) => {
    e.preventDefault();
    setComment(!comment);
  };


  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/comments/projects/${id2}`
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      setLoading(false);
      setComments(json);
    }
  };


  if (loading) {
    return (
      <div className="loadinguserproject">
        <h1>loading</h1>
      </div>
    );
  }

  return (
    <div className="projectPage">
      <ProjectsNavbar/>
      {data ? (
        <div>
          <ul>
          <img height={200} width={200} src={photo} alt="jkkhjlkh" />
            <li>name {name}</li>
            <li>dscription {description}</li>
            <li>repo {repo}</li>
            <li>demo {demo}</li>
            <li>type {type}</li>
            <li>views {views}</li>
          </ul>
          <hr/>
          <div>
            <img src="dd" alt="pic for a user" />
            <h1>more projects from this user</h1>
            <Link to={`/profile/${userid}`}>user</Link>
          </div>
          <hr />
          {
            comment ?           <Comment toggleComment={toggleComment} id={id} />
: null
          }

          <button onClick={toggleComment}>add comment</button>
        </div>
      ) : null}
            {comments.length > 0 ? null : (
        <button onClick={fetchComments}>load comments</button>
      )}
      {comments.length > 0 ? <h1>comments</h1> : null}
      {comments.map((comment: any) => (
        <div>
          {comment.name}
          {comment.body}
        </div>
      ))}
    </div>
  );
};

export default Project;
