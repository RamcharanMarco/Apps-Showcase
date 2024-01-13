import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";


export const useDeleteAllProjects = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteAllProjects = async (id: any) => {
    setLoading(true);
    setError(null);
    const response = await fetch(`http://localhost:5000/api/projects/user/${user.user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      console.log(json);
      setLoading(false);
      navigate(`/user/${user.user._id}`);
    }
  };

  return { deleteAllProjects, loading, error };
};
