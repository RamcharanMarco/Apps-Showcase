import { FC, useState } from "react";
import "../styles/addtech.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface AppProps {
  toggleAddTechModule: (params: any) => any;
  addTech: (params: any) => any;
  technologies: string[];
}

const AddTech: FC<AppProps> = ({
  toggleAddTechModule,
  technologies,
  addTech,
}) => {
  const [tech, setTech] = useState<string>("");

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

  return (
    <div className="addtech-box">
      <div className="addtechs">
        <div className="tlist">
          {technologies.map((tech) => (
            <p>{tech}</p>
          ))}
          {technologies.length === 0 ? <p>no tech</p> : null}
        </div>

        <div>
          <input
            type="text"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="tech"
          />
          <div className="bx">
            {5 === 5
              ? list.map((item) => {
                  if (item.includes(tech)) {
                    return (
                      <div
                        className="item"
                        onClick={() => {
                          addTech(item);
                          setTech("");
                        }}
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
        <button
          onClick={() => {
            addTech(tech);
            setTech("");
          }}
        >
          add tech
        </button>
        <button onClick={toggleAddTechModule}>done</button>
      </div>{" "}
      <IoArrowBackCircleOutline
        className="cancel"
        onClick={toggleAddTechModule}
      />
    </div>
  );
};

export default AddTech;
