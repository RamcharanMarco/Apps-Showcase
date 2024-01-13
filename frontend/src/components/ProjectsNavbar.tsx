import { Link } from "react-router-dom";
import { useState } from "react";

const ProjectsNavbar = () => {
  const [type, setType] = useState<string>("");

  return (
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
        <button>search</button>
      </div>
    </nav>
  );
};

export default ProjectsNavbar;
