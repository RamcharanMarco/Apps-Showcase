import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/projectsPage.css";
import ProjectsNavbar from "../components/ProjectsNavbar";

const Projects = () => {
  const { id } = useParams();

  const { user } = useStore();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<string | null>(null);

  const [type, setType] = useState<string>("all");

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(`http://localhost:5000/api/public/projects`);
    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError("error");
    }
    if (response.ok) {
      setLoading(false);
      setData(json);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);


  const search = async (e:any) => {
    e.preventDefault();
    let query = type;
    try {
      const res = await fetch(
        `http://localhost:5000/api/public/projects/search?query=${query}`
      );
      const json = await res.json();
      setData(json)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="projectsPage">
      <nav className="projectsnav">
        <Link to="/">
          <h1>SHOWASE</h1>
        </Link>
        <div className="search">
          <select onChange={(e: any) => setType(e.target.value)} value={type}>
            <option value="all">all</option>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
            <option value="fullstack">fullstack</option>
          </select>
          <button onClick={search}>search</button>
        </div>
      </nav>{" "}
      {data && data.length === 0 ? (
        <div className="empty">
          <h1>no projects</h1>
        </div>
      ) : (
        <div
          style={
            data && data.length === 1
              ? { gridTemplateColumns: ` 1fr`, width: `40%` }
              : { gridTemplateColumns: `1fr 1fr 1fr`, width: `85%` }
          }
          className="container"
        >
          {data && data.length > 0
            ? data.map((proj: any) => (
                <div className="box">
                  <img src={proj.photo} alt="fngkkrn" />
                  <div id="info" className="info">
                    <h1>{proj.name}</h1>
                    <p>{proj.description}</p>
                    <Link to={`/projects/${proj._id}`}>view</Link>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
      {/*{data && data.length > 3 ? <button>load more</button> : null}*/}
    </div>
  );
};

export default Projects;
