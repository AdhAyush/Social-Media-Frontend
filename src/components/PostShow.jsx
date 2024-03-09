// import { GiSelfLove } from "react-icons/gi";
// import { FaRegComments } from "react-icons/fa";

// function PostShow({ post }) {
//   return (
//     <>
//       <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-2 my-8">
//         <p className="text-gray-800 text-base mb-2 text-justify">{post.body}</p>
//         {/* Post img */}
//         post img
//         {/* {post.post.img && <div>img</div>} */}
//         <div className="px-4 py-2">
//           <div className="flex justify-around items-center border-t-2 p-2">
//             <button className="flex items-center">
//               <GiSelfLove size={20} />
//               <span className="text-gray-600 ml-2">{post.likes}</span>
//             </button>
//             <button className="flex items-center">
//               <span className="text-gray-600 mr-2">
//                 0{/* {post.post.comments.length}{" "} */}
//               </span>
//               <FaRegComments size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PostShow;

import { GiSelfLove } from "react-icons/gi";
import { FaRegComments } from "react-icons/fa";

function PostShow({ post }) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-2 my-8">
      {/*display user's name and profile image*/}
      <div className="flex items-center mb-2 border-b-2 border-orange-500 pb-2">
        <img src={post.img} alt="User" className="w-8 h-8 rounded-full mr-2" />
        <p className="text-orange-500 font-bold text-base hover:text-blue-500">{post.user_name}</p>
      </div>

      <p className="text-gray-800 text-base mb-2 text-justify">{post.body}</p>
      {/* Post Media */}
      {post.img && (
        <div className="post-media-container">
          {post.fileType === 'video' ? (
            <video controls className="w-full h-auto">
              <source src={post.img} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : post.fileType === 'application' ? (
            <embed src={post.img} type="application/pdf" width="100%" height="500px" />
          ) : (
            <img src={post.img} alt="Post" className="w-full h-auto" />
          )}
        </div>
      )}
      <div className="px-4 py-2">
        <div className="flex justify-around items-center border-t-2 p-2">
          <button className="flex items-center">
            <GiSelfLove size={20} />
            <span className="text-gray-600 ml-2">{post.likes}</span>
          </button>
          <button className="flex items-center">
            <span className="text-gray-600 mr-2">
              0{/* {post.comments.length}{" "} */}
            </span>
            <FaRegComments size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostShow;

