import { GiSelfLove } from "react-icons/gi";
import { FaRegComments } from "react-icons/fa";

function PostShow({ post }) {
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-8">
        {/* Post Image */}
        {post.post.image && <div>image</div>}

        <div className="px-4 py-2">
          <p className="text-gray-800 text-base mb-2 text-justify">
            {post.post.text}
          </p>
          <div className="flex justify-around items-center border-t-2 p-2">
            <button className="flex items-center">
              <GiSelfLove size={20} />
              <span className="text-gray-600 ml-2">{post.post.likes}</span>
            </button>
            <button className="flex items-center">
              <span className="text-gray-600 mr-2">
                {post.post.comments.length}{" "}
              </span>
              <FaRegComments size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostShow;
