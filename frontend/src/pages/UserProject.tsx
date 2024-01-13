import "../styles/userproject.css";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import ConfirmDeleteProject from "../components/ConfirmDeleteProject";
import { useEditProject } from "../hooks/useEditProject";
import { useChangeProjectPhoto } from "../hooks/useChangeProjectPhoto";
import { CiEdit } from "react-icons/ci";

const UserProjectPage = () => {
  const { changeProjectPhoto } = useChangeProjectPhoto();

  const [photo, setPhoto] = useState<string>("");
  const [newphoto, setNewphoto] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const [demo, setDemo] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [lib, setLib] = useState<string>("");
  const [views, setViews] = useState<number>(0);

  const [lang, setLang] = useState<string>("");
  const [db, setDb] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [hosting, setHosting] = useState<string>("");
  const [del, setDel] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const { editProject } = useEditProject();

  const { projectid } = useParams();
  const { user } = useStore();

  const [data, setData] = useState<any>(null);
  const [comments, setComments] = useState<{ name: string; body: string }[]>(
    []
  );

  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/projects/${projectid}`,
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
      setData(json);
      setPhoto(json.photo);
      setName(json.name);
      setDescription(json.description);
      setRepo(json.repo);
      setDemo(json.demo);
      setTechnologies(json.technologies);
      setViews(json.views);
      setType(json.type);
      setLib(json.lib);
      setLang(json.lang);
      setDb(json.db);
      setCss(json.css);
      setHosting(json.hosting);
      setId(json._id);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const toggleDelete = (e: any) => {
    e.preventDefault();
    setDel(!del);
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    editProject(name, description, repo, demo, type, technologies);
  };

  const handleEditPhoto = (e: any) => {
    e.preventDefault();
    changeProjectPhoto(newphoto);
  };

  /*if (loading) {
    return (
      <div className="loadinguserproject">
        <h1>loading</h1>
      </div>
    );
  }*/

  const [technologies, setTechnologies] = useState<string[]>([]);

  const [list, setList] = useState<string[]>([
    "html",
    "ruby",
    "golang",
    "css",
    "javascript",
    "typescript",
    "node",
    "python",
    "ruby",
    "c#",
    "scss",
    "java",
    "php",
    "react",
    "vue",
    "angular",
    "nuxt",
    "next",
    "svelte",
    "webcomponents",
    "expressjs",
    "django",
  ]);

  const [tech, setTech] = useState<string>("");

  const addTech = (e: any) => {
    e.preventDefault();
    setTechnologies((prev) => [tech, ...prev]);
    setTech("");
  };

  const addTech2 = (tech: string) => {
    setTechnologies((prev) => [tech, ...prev]);
    setTech("");
  };

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/comments/projects/${projectid}`
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

  return (
    <div className="userProjectPage">
      <h1>project</h1>
      {del ? (
        <ConfirmDeleteProject id={id} toggleDeleteProject={toggleDelete} />
      ) : null}
      {data ? (
        <div>
          <div className="projectnav">
            <button onClick={toggleDelete}>delete</button>
          </div>
          {data ? (
            <div className="project">
              <div className="project-photo">
                <img src={photo} alt="photo" />
                <input
                  name="photo"
                  onChange={(e: any) => setNewphoto(e.target.files[0])}
                  type="file"
                />
                <label htmlFor="file-upload" className="custom-file-upload">
                  upload
                </label>
                <button onClick={handleEditPhoto}>save photo</button>
                <hr />
              </div>
              <div className="details">
                <div>
                  <input
                    type="text"
                    onChange={(e: any) => setName(e.target.value)}
                    value={name}
                    placeholder="name"
                  />
                  <CiEdit />
                </div>
                <div>
                  <div className="con">
                    {technologies.map((tech) => (
                      <p>{tech}</p>
                    ))}
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => setTech(e.target.value)}
                      placeholder="tech"
                    />
                    <button onClick={addTech}>add tech</button>

                    <div className="bx">
                      {tech !== ""
                        ? list.map((item) => {
                            if (item.includes(tech)) {
                              return (
                                <div
                                  className="item"
                                  onClick={() => addTech2(item)}
                                >
                                  {item}
                                </div>
                              );
                            } else {
                              return;
                            }
                          })
                        : null}
                    </div>
                  </div>
                  <select
                    onChange={(e: any) => setLib(e.target.value)}
                    value={lib}
                  >
                    <h1>frameworks or libraries</h1>
                    <option value="react">react</option>
                    <option value="vue">vue</option>
                    <option value="angular">angular</option>
                    <option value="nuxt">nuxt</option>
                    <option value="nextjs">nextjs</option>
                    <option value="sveltekit">sveltekit</option>
                    <option value="webcomponents">web components</option>
                    <option value="expressjs">expressjs</option>
                    <option value="nestsj">nestjs</option>
                    <option value="django">django</option>
                    <option value="flask">flask</option>
                    <option value="fastapi">fastapi</option>
                    <option value="rubyonrails">ruby on rails</option>
                    <option value="rocket">rocket</option>
                    <option value="gin">gin</option>
                    <option value=".net">.net</option>
                    <option value="springboot">spring boot</option>
                    <option value="koa">koa</option>
                    <option value="laravel">laravel</option>
                  </select>
                  <CiEdit />
                </div>
                <div>
                <select
                  onChange={(e: any) => setType(e.target.value)}
                  value={type}
                >
                  <h1>type</h1>
                  <option value="frontend">frontend</option>
                  <option value="fullstack">fullstack</option>
                  <option value="backend">backend</option>
                </select>
                <CiEdit />
                </div>
                <div>
                <input
                  type="text"
                  placeholder="url"
                  value={demo}
                  onChange={(e: any) => setDemo(e.target.value)}
                />
                <CiEdit />
                </div>
                <div>
                <input
                  type="text"
                  placeholder="repo"
                  value={repo}
                  onChange={(e: any) => setRepo(e.target.value)}
                />
                <CiEdit />
                </div>
                <p>views {views}</p>
                <button onClick={handleEdit}>edit details</button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        ""
      )}
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

export default UserProjectPage;
