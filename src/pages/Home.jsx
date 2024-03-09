// import InputPost from "../components/InputPost";
// import PostList from "../components/PostList";
// import LeftSidebar from "../components/LeftSidebar";
// import RightSidebar from "../components/RightSidebar";
// import Navbar from "../components/Navbar";
// import ProfileSection from "../components/ProfileSection";
// import useProfile from "../hooks/ProfileHook";
// import TimelinePostList from "../components/TimelinePostList";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function Home() {
//   const navigate = useNavigate();
//   const { email, loading , getPosts} = useProfile();
//   useEffect(() => {
//     console.log("Here email is");
//     if (email === "") {
//       navigate("/login");
//     }
//   }, [email]);


//   // useEffect(() => {
//   //   getPosts(); // Call the getPosts function when the component mounts
//   // }, []);

//   return (
//     <div className="flex flex-col justify-center align-center">
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <div className="text-4xl text-white">Loading...</div>
//         </div>
//       ) : (
//         <div>
//           <Navbar />
//           <div className="flex flex-row w-full justify-center mt-16">
//             <div className=" h-full overflow-y-auto">
//               <LeftSidebar />
//             </div>
          
//             <div className="w-3/5">
//               <InputPost />
//               <PostList />
//             </div>
          
//             <div className="invisible md:visible">
//               <RightSidebar />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;


import InputPost from "../components/InputPost";
import PostList from "../components/PostList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Navbar from "../components/Navbar";
import ProfileSection from "../components/ProfileSection";
import useProfile from "../hooks/ProfileHook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const { email, loading, getPosts } = useProfile();
  useEffect(() => {
    console.log("Here email is");
    if (email === "") {
      navigate("/login");
    }
  }, [email]);

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-4xl text-white">Loading...</div>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="flex flex-row w-full justify-center mt-16">
            <div className="w-1/4 h-full overflow-y-auto">
              <LeftSidebar />
            </div>
            <div className="w-3/5">
              <div className="flex flex-col space-y-4">
                <InputPost />
                <PostList />
              </div>
            </div>
            <div className="w-1/4 h-full overflow-y-auto">
              <RightSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
