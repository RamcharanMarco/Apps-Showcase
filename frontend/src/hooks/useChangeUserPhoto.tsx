import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useSignupPhoto = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { user,loginuser } = useStore();
  const navigate = useNavigate();

  const signupPhoto = async (photo: string, email:string,password:string,username:string, type:string,experience:string) => {
    const body = { photo:photo,email,password,username,type,experience };
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `http://localhost:5000/api/auth/photo`,
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
      loginuser(json)
      setLoading(false)
      navigate(`/user/${json.user._id}`)
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { signupPhoto, loading, error };
};
