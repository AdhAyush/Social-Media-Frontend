import { createContext, useState, useCallback } from "react";
import axios from "axios";

const ProfileContext = createContext();

function Provider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchProfile = useCallback(async (id) => {
    const response = await axios.get(`http://localhost:3001/profiles/${id}`);

    setProfiles(response.data);
  }, []);

  //Create Profile logic
  const createProfile = async (data) => {
    const response = await axios.post("http://localhost:3001/profiles/", {
      data,
    });

    const updatedProfile = [...profiles, response.data];
    setProfiles(updatedProfile);
  };

  const createPost = async (post) => {
    const response = await axios.post("http://localhost:3001/profiles/posts/", {
      post,
    });
    const updatedPost = [...profiles, response.data];
    setPosts(updatedPost);
  };

  //Shared data and functions
  const valuetoShare = {
    fetchProfile,
    createProfile,
    createPost,
    profiles,
  };

  return (
    <ProfileContext.Provider value={valuetoShare}>
      {children}
    </ProfileContext.Provider>
  );
}

export { Provider };
export default ProfileContext;
