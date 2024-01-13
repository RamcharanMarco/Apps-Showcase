import React from "react";
import pic from "../1.png";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/userProjectsPage.css";

const UserProjectsPage = () => {
  const { id } = useParams();

  /*
        <div className="box">
          <img src={pic} alt="fngkkrn" />
          <div id='info' className="info">
            <h1>elite clone</h1>
            <p>small description</p>
            <Link to='/'>view</Link>
          </div>
        </div>
  */
  const { user } = useStore();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [formid, setFormid] = useState<any>("");

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/projects/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      setLoading(false);
      console.log("projects", json);
      setData(json);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="userProjectsPage">
      {data && data.length === 0 ? (
        <div className="empty">
          <h1>You have no projects</h1>
          <Link to={`/user/${id}/projects/add`}>Add a Project</Link>
        </div>
      ) : (
        <div
          style={
            data && data.length === 1
              ? { gridTemplateColumns: ` 1fr`,width:`40%` }
              : { gridTemplateColumns: `1fr 1fr`,width:`70%` }
          }
          className="container"
        >
          {data && data.length > 0
            ? data.map((proj: any) => (
                <div
                 className="box">
                  <img
                   src={proj.photo} alt="fngkkrn" />
                  <div id="info" className="info">
                    <h1>{proj.name}</h1>
                    <p>{proj.description}</p>
                    <Link to={`/user/${id}/projects/${proj._id}`}>view</Link>
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

export default UserProjectsPage;
