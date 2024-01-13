import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/portfolio.css";

const Portfolio = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  const getData = async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/public/user/profile/${id}`
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      setLoading(false);
      console.log("userprofile", json);
      setData(json);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="profile">
      <Link to='/projects'>back</Link>
      <h1>profile page</h1>
      {data ? (
        <div>
          <div className="details">
          <p>  type {data.userDetails.type}</p>
          <p> exp {data.userDetails.experience}</p>
          <p> location {data.userDetails.location}</p>
          <p> website {data.userDetails.website}</p>
          <p> repo {data.userDetails.repo}</p>
          <p> joined {data.userModel.createdAt}</p>

          <p> {data.userModel.username}</p>
          <img height={200} width={200} src={data.userDetails.photo} alt="" />
          </div>
          <hr />
          {data.projects.map((proj: any) => (
                <div className="box">
                  <img height={200} width={200} src={proj.photo} alt="fngkkrn" />
                  <div id="info" className="info">
                    <h1>{proj.name}</h1>
                    <p>{proj.description}</p>
                    <Link to={`/projects/${proj._id}`}>view</Link>
                  </div>
                </div>
              ))}
        </div>
      ) : null}
    </div>
  );
};

export default Portfolio;
