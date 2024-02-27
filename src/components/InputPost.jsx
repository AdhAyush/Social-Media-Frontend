import React, { useState } from "react";
import useProfile from "../hooks/ProfileHook";

const InputPost = () => {
  const { posts, createPost } = useProfile();
  const [post, setPost] = useState({
    text: "",
    image: null,
    likes: 0,
    comments: [],
  });

  const handlePostTextChange = (e) => {
    setPost({ ...post, text: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost(post);

    // Clear the post text and image after submitting
    setPost({ text: "", image: null });
  };

  return (
    <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto mb-8 mt-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-16 px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none"
          placeholder="What's on your mind?"
          value={post.text}
          onChange={handlePostTextChange}
        ></textarea>
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block p-2 w-full bg-gray-100 border-t border-gray-300 focus:outline-none"
        /> */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputPost;
