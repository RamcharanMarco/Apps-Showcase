import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const ProjectsLayout = () => {
  return (
    <div className="projectsLayout">
      <Outlet />
      <Footer />
    </div>
  );
};

export default ProjectsLayout;
