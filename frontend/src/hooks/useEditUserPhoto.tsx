import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const useEditUserPhoto = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { user} = useStore();
  const navigate = useNavigate();

  const changeUserPhoto = async (photo: string) => {
    const body = { photo:photo};
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `http://localhost:5000/api/users/details/photo/${user.userdetails._id}`,
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

  return { changeUserPhoto, loading, error };
};
