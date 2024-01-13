import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";


export const useDeleteProject = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteProject = async (id: any) => {
    setLoading(true);
    setError(null);
    const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
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
      navigate(`/user/${user.user._id}/projects`);
    }
  };

  return { deleteProject, loading, error };
};
