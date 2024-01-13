import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const useChangeProjectPhoto = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { user,loginuser } = useStore();
  const navigate = useNavigate();

  const {projectid} = useParams()

  const changeProjectPhoto = async (photo: string) => {
    const body = { photo:photo};
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `http://localhost:5000/api/projects/photo/${projectid}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.data;
      setError(false);
      setLoading(false)
      window.location.reload()
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { changeProjectPhoto, loading, error };
};
