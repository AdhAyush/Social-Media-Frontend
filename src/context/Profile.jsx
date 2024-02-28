import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const ProfileContext = createContext();

function Provider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([{ id: 5, name: "JB" }]);

  const fetchProfile = useCallback(async (id) => {
    const response = await axios.get(`http://localhost:3001/profiles/${id}`);

    setProfiles(response.data);
  }, []);

  const getPosts = useCallback(async (id) => {
    const response = await axios.get(`http://localhost:3001/posts`);

    setPosts(response.data);
  });

  //Get Friend Suggestions
  const getSugg = async () => {
    const response = await axios.get("");

    setSuggestions(response.data);
  };

  useEffect(() => {
    fetchProfile("db23");
    getPosts();
    // getSugg();
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
    const response = await axios.post("http://localhost:3001/posts/", {
      post,
    });
    const updatedPost = [...posts, response.data];
    setPosts(updatedPost);
  };

  //Follow logic
  const follow = async (id) => {
    console.log("Follow called for id:", id);
    // const response = await axios.post("", {
    //   id,
    // });
  };

  //Shared data and functions
  const valuetoShare = {
    fetchProfile,
    createProfile,
    createPost,
    profiles,
    posts,
    suggestions,
    follow,
  };

  return (
    <ProfileContext.Provider value={valuetoShare}>
      {children}
    </ProfileContext.Provider>
  );
}

export { Provider };
export default ProfileContext;
