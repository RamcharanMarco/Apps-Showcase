import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/userProfile.css";

const UserInfo = () => {
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

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/users/details/${id}`,
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
      console.log("userdetails", json);
      setData(json);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="userProfile">
      <div className="left">
        {data && data.photo ? (
          <div>
            <img
              src={data.photo}
              height="200px"
              width="200px"
              alt={data.photo}
            />
            <input type="file" />
            <button>change photo</button>
          </div>
        ) : loading ? (
          <p>loading</p>
        ) : (
          <div>
            <h1>upload photo</h1>
            <input type="file" />
            <button>upload</button>
          </div>
        )}
      </div>
      <div className="right">
        {data ? (
          <>
            {read ? (
              <button onClick={() => setRead(!read)}>edit</button>
            ) : (
              <button onClick={() => setRead(!read)}>cancel</button>
            )}
            <input
              type="text"
              readOnly={read}
              placeholder="experience"
              value={data.type}
            />
            <input
              type="text"
              readOnly={read}
              placeholder="experience"
              value={data.experience}
            />
            <input type="text" readOnly={read} />
            <input
              type="text"
              readOnly={read}
              placeholder="online git profile"
            />
            <input type="text" readOnly={read} placeholder="website url" />
            {read ? null : <button>save</button>}
          </>
        ) : loading ? (
          <p>loading</p>
        ) : null}
      </div>
    </div>
  );
};

export default UserInfo;
