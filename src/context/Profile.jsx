import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const ProfileContext = createContext();

const getLocalEmail = () => {
  let em = localStorage.getItem("EMAIL");
  // console.log("The localstorageItem is ", em);
  if (em != "undefined") {
    return JSON.parse(em);
  } else {
    return "";
  }
};

function Provider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [UID, setUID] = useState("");
  const [email, setEmail] = useState(getLocalEmail);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [friends, setFriends] = useState([]);
  const [fRequests, setFRequests] = useState([]);
  const [isLoggedSuccessfully, setIsLoggedSuccessfully] = useState(false);

  const Signup = (id, email) => {
    setUID(id);
    setEmail(email);
    setIsLoggedSuccessfully(true);
    // console.log("EMail set", email);
  };

  const Login = async (email, password) => {
    try {
      console.log(email);
      const response = await axios.get(
        `http://127.0.0.1:8000/suggestfriends`,

        {
          params: {
            email: email,
            password: password,
          },
        }
      );

      if (response.status === 200) {
        console.log("Login response", response.data);
        setIsLoggedSuccessfully(true);
      } else {
        throw new Error("Failed to fetch friend suggestions");
      }
    } catch (error) {
      console.error("Error fetching friend suggestions:", error.message);
      return []; // Return an empty array in case of an error
    }
  };

  // const fetchProfile = useCallback(async (id) => {
  //   const response = await axios.get(`http://localhost:3001/profiles/${id}`);

  //   setProfiles(response.data);
  // }, []);

  const getPosts = useCallback(async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/suggestposts`);

      if (response.status === 200) {
        setLoading(false);
        let objData = response.data;
        let arrData = Object.values(objData);

        setPosts(arrData);
      } else {
        setLoading(false);
        setError(true);
        throw new Error("Failed to fetch user posts");
      }
    } catch (error) {
      console.error("Error fetching user posts:", error.message);
      return []; // Return an empty array in case of an error
    }
  });

  //Get Friend Suggestions
  const getSugg = async () => {
    try {
      console.log(email);
      const response = await axios.get(
        `http://127.0.0.1:8000/suggestfriends`,

        {
          params: {
            email: "ayushadhikari@gmail.com",
          },
        }
      );

      if (response.status === 200) {
        // console.log("Sugg", response.data);
        const array = Object.entries(response.data).map(([key, value]) => ({
          key,
          value,
        }));

        // console.log(array);
        setSuggestions(array);
      } else {
        throw new Error("Failed to fetch friend suggestions");
      }
    } catch (error) {
      console.error("Error fetching friend suggestions:", error.message);
      return []; // Return an empty array in case of an error
    }
  };

  useEffect(() => {
    // fetchProfile("db23");
    // if (isLoggedSuccessfully || email != "")
    {
      localStorage.setItem("EMAIL", JSON.stringify(email));
      getPosts();
      getSugg();
      getFriendReq();
    }
  }, [email, isLoggedSuccessfully]);

  //Create Profile logic
  const createProfile = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://127.0.0.1:8000/createuser", {
        email: data.email,
        displayName: data.displayName,
        password: data.password,
      });
      console.log("The response is ", response.data);
      Signup(response.data.uid, data.email);

      // Check if the request was successful (status code 2xx)
      if (response.status === 201) {
        console.log("User created successfully");
        setIsLoggedSuccessfully(true);
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }

    // axios
    //   .get("http://127.0.0.1:8000/createuser", {
    //     params: { data },
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   });
  };

  const createPost = async (body, imageUrl, likes) => {
    console.log(body, imageUrl, likes);
    try {
      const response = await axios.post("http://127.0.0.1:8000/createpost", {
        email: "ayush@gmail.com",
        body,
        imageUrl,
        likes,
      });
      // console.log("The response is ", response.data);

      // Check if the request was successful (status code 2xx)
      if (response.status === 201) {
        console.log("Post created successfully");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post....:", error.message);
    }
  };

  //Follow logic
  const sendRequests = async (id) => {
    console.log("Request sent to id:", id);
    try {
      console.log(email);
      const response = await axios.post(
        `http://127.0.0.1:8000/sendfriendrequest`,
        {
          email: email,
          receiver_uid: id,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      } else {
        throw new Error("Failed to send friend requests");
      }
    } catch (error) {
      // console.error("Error sending friend request:", error.message);
      return []; // Return an empty array in case of an error
    }
  };

  const acceptRequests = async (id) => {
    console.log("Request accepted of id:", id);
    try {
      // console.log(email);
      const response = await axios.post(
        `http://127.0.0.1:8000/confirmfriendrequest`,
        {
          email: email,
          friends_uid: id,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      } else {
        throw new Error("Failed to accept friend requests");
      }
    } catch (error) {
      // console.error("Error accepting friend request:", error.message);
      return []; // Return an empty array in case of an error
    }
  };

  const getFriends = useCallback(async () => {
    try {
      // console.log(email);
      const response = await axios.get(
        `http://127.0.0.1:8000/getfriends`,

        {
          params: {
            email: "ayush@gmail.com",
          },
        }
      );

      if (response.status === 200) {
        // console.log("Friends are:", response.data);
        const dataArray = Object.entries(response.data).map(
          ([id, { name, email }]) => ({
            id,
            name,
            email,
          })
        );
        setFriends(dataArray);
        // console.log(friends);
      } else {
        throw new Error("Failed to fetch friend ");
      }
    } catch (error) {
      console.error("Error fetching friend :", error.message);
      return []; // Return an empty array in case of an error
    }
  });

  const getFriendReq = useCallback(async () => {
    try {
      // console.log(email);
      const response = await axios.get(
        `http://127.0.0.1:8000/getfriendrequests`,

        {
          params: {
            email: "jb@jb.com",
          },
        }
      );

      if (response.status === 200) {
        let data = response.data;
        const dataArray = Object.keys(data).map((id) => ({ id, ...data[id] }));
        console.log("REQ=", dataArray);
        setFRequests(dataArray);
      } else {
        throw new Error("Failed to fetch friend ");
      }
    } catch (error) {
      console.error("Error fetching friend :", error.message);
      return []; // Return an empty array in case of an error
    }
  });

  //Shared data and functions
  const valuetoShare = {
    // fetchProfile,
    createProfile,
    createPost,
    profiles,
    posts,
    suggestions,
    sendRequests,
    acceptRequests,
    Login,
    UID,
    email,
    loading,
    error,
    getFriends,
    getFriendReq,
    friends,
    fRequests,
    isLoggedSuccessfully,
  };

  return (
    <ProfileContext.Provider value={valuetoShare}>
      {children}
    </ProfileContext.Provider>
  );
}

export { Provider };
export default ProfileContext;
