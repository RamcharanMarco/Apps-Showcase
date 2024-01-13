import "../styles/addproject.css";
import { useState } from "react";
import { useAddProject } from "../hooks/useAddProject";
import AddTech from "../components/AddTech";

const UserAddProjectPage = () => {
  const { addProject } = useAddProject();

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
  const [selectedImage, setSelectedImage] = useState();

  const [toggleAddTech, setToggleAddTech] = useState(false);

  const [technologies, setTechnologies] = useState<string[]>([]);

  const addTech = (tech: string) => {
    setTechnologies((prev) => [tech, ...prev]);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    console.log(technologies);
    addProject(photo, name, description, repo, demo, technologies, type);
  };

  const toggleAddTechModule = (e: any) => {
    e.preventDefault();
    setToggleAddTech(!toggleAddTech);
  };

  return (
    <div className="addproject">
      <h1>ADD PROJECT</h1>
      <div className="photoupload">
        <h1>pic</h1>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            height={200}
            width={300}
            alt="Thumb"
          />
        ) : (
          <div style={{height:'200px', width:'300px', border:'1px solid black'}}>

          </div>
        )}
        <label htmlFor="file-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload"></i>
          {selectedImage ? "change" : "choose"}
        </label>
        <input
          id="file-upload"
          name="files"
          onChange={(e: any) => {
            setPhoto(e.target.files[0]);
            setSelectedImage(e.target.files[0]);
          }}
          type="file"
          multiple
        />
      </div>
      <div className="add-details">
        <h1>add details</h1>
        <h1>technologies</h1>
        <button onClick={toggleAddTechModule}>technologies</button>
        <div className="chosentechs">
        {technologies.length > 0 ? (
          technologies.map((item) => {
            return (
              <div className="item" onClick={() => addTech(item)}>
                {item}
              </div>
            );
          })
        ) : (
          <p>notechnoglies</p>
        )}
        </div>

        {toggleAddTech ? (
          <AddTech
            toggleAddTechModule={toggleAddTechModule}
            addTech={addTech}
            technologies={technologies}
          />
        ) : null}
        <h1>name</h1>
          <input
            type="text"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
            placeholder="name"
          />
          <h1>type</h1>
          <select onChange={(e: any) => setType(e.target.value)} value={type}>
            <option value="frontend">frotnend</option>
            <option value="backend">backend</option>
            <option value="fullstack">fullstack</option>
          </select>
          <h1>description</h1>
          <textarea
            placeholder="description"
            onChange={(e: any) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <h1>live demo</h1>
          <input
            type="text"
            placeholder="url"
            value={demo}
            onChange={(e: any) => setDemo(e.target.value)}
          />
          <h1>repo</h1>
          <input
            type="text"
            placeholder="repo"
            value={repo}
            onChange={(e: any) => setRepo(e.target.value)}
          />
                <button onClick={handleClick}>create portfolio</button>

      </div>
    </div>
  );
};

export default UserAddProjectPage;
