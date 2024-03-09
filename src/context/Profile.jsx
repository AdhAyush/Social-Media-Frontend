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
  const [activePage, setActivePage] = useState("home");
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [UID, setUID] = useState("");
  const [email, setEmail] = useState(getLocalEmail);
  const [name, setName] = useState("Ayush");
  const [profilepic, setProfilePic] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [friends, setFriends] = useState([]);
  const [fRequests, setFRequests] = useState([]);
  const [isLoggedSuccessfully, setIsLoggedSuccessfully] = useState(false);
  

  const Signup = (id, email ,name) => {
    setUID(id);
    setEmail(email);
    setName(name);
    setIsLoggedSuccessfully(true);
    // console.log("EMail set", email);
  };

  const Login = async (email, password) => {
    try {
      console.log(email);
      const response = await axios.get(
        `http://127.0.0.1:8000/login`,

        {
          params: {
            email: email,
            password: password,
          },
        }
      );

      if (response.status === 200) {
        const userEmail = response.data.email;
        console.log("Login response", response.data);
        setEmail(userEmail);
        setName(response.data.displayName);
        setUID(response.data.uid);
        setProfilePic(response.data.pic);
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
      const response = await axios.get(`http://127.0.0.1:8000/suggestposts`,
      {
        params: {
          // email: "adhikariayush923@gmail.com",
          email: email,
        },
      })
      ;

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

//get timelinepost 
const getTimelinePosts = useCallback(async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/timeline`,
    {
      params: {
        // email: "adhikariayush923@gmail.com",
        email: email,
      },
    })
    ;

    if (response.status === 200) {
      setLoading(false);
      let objData = response.data;
      let arrData = Object.values(objData);

      setTimelinePosts(arrData);
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


const searchFunction = async (user_search) => {
  try {
    // Make an API request to perform the search
    const response = await axios.get(`http://127.0.0.1:8000/searchuser`, {
      params: {
        user_search: user_search,
      },
    });

    // Assuming the response contains an array of search results

    let objData = response.data;
    let arrData = Object.values(objData);

    // Return the search results
    setSearchResults(arrData);
  } catch (error) {
    console.error("Error searching:", error.message);
    return []; // Return an empty array in case of an error
  }
};



  //Get Friend Suggestions
  const getSugg = async () => {
    try {
      console.log(email);
      const response = await axios.get(
        `http://127.0.0.1:8000/suggestfriends`,

        {
          params: {
            // email: "ayushadhikari@gmail.com",
            email: email,
          },
        }
      );

      if (response.status === 200) {
        // console.log("Sugg", response.data);
        const array = Object.entries(response.data).map(([key, value]) => ({
          key,
          value,
        }));


        let objData = response.data;
        let arrData = Object.values(objData);


        // console.log(array);
        setSuggestions(arrData);
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
      getTimelinePosts();
      getFriends();
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
        pic:data.pic,
      });
      console.log("The response is ", response.data);
      Signup(response.data.uid, data.email , data.displayName);

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

  const createPost = async (body, imageUrl, likes , fileType) => {
    console.log(body, imageUrl, likes, fileType);
    try {
      const response = await axios.post("http://127.0.0.1:8000/createpost", {
        // email: "ayush@gmail.com",
        email,
        body,
        imageUrl,
        likes,
        fileType,
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
            // email: "ayush@gmail.com",
            email: email,
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
            // email: "jb@jb.com",
            email: email,
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
    timelinePosts,
    suggestions,
    sendRequests,
    acceptRequests,
    Login,
    UID,
    email,
    name, 
    profilepic,
    loading,
    error,
    getFriends,
    getFriendReq,
    friends,
    fRequests,
    isLoggedSuccessfully,
    activePage,
    setActivePage,
    getPosts,
    getTimelinePosts,
    searchResults,
    setSearchResults,
    searchFunction,
    
  };

  return (
    <ProfileContext.Provider value={valuetoShare}>
      {children}
    </ProfileContext.Provider>
  );
}

export { Provider };
export default ProfileContext;
