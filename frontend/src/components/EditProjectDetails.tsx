import { FC, useState } from "react";
import "../styles/editdetail.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { useEditUserDetails } from "../hooks/useEditUserDetails";

interface AppProps {
  toggleEditDetails: (e: any, detail: string) => any;
  detail: string;
  websit: string;
  loc: string;
  rep: string;
  exp: number;
  typ: string;
  phot: string;
}

const EditProjectDetails: FC<AppProps> = ({
  toggleEditDetails,
  typ,
  detail,
  websit,
  loc,
  rep,
  exp,
  phot,
  
}) => {
  const { editUserDetails } = useEditUserDetails();

  const [website, setWebsite] = useState<string>(websit);
  const [location, setLocation] = useState<string>(loc);
  const [repo, setRepo] = useState<string>(rep);
  const [type, setType] = useState<string>(typ);


  const editDetails = (e: any) => {
    e.preventDefault();
    editUserDetails(type, exp, location, website, repo, phot);
  };

  return (
    <div className="editdetail">
      <h1>editdetails</h1>
      <p>{detail}</p>
      {
        detail === 'website' ?
        <>
              <input
        type="text"
        placeholder="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
            <button onClick={editDetails}>save</button>

        </>
        : detail === 'location' ?
        <>
              <input
        type="text"
        placeholder="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
                  <button onClick={editDetails}>save</button>

        </>
        :
        detail === 'repo' ?
        <>
                        <select
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          >
            <option value="github">gitlab</option>
            <option value="gitlab">gitlab</option>
            <option value="bitbucket">bitbucket</option>
          </select>
          <button onClick={editDetails}>save</button>
        </>
        : detail === 'type' ?
        <>
                <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="frontend">frontend</option>
        <option value="backend">backend</option>
        <option value="fullstack">fullstack</option>
      </select>
      <button onClick={editDetails}>save</button>

        </>

      :
        null

      }


      <IoArrowBackCircleOutline
        className="cancel"
        onClick={(e) => toggleEditDetails(e, '')}
      />
    </div>
  );
};

export default EditProjectDetails;
