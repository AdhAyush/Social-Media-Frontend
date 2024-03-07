import React, { useState } from "react";
import useProfile from "../hooks/ProfileHook";
// import firebase from "firebase/app";
// import "firebase/storage";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../firebase/firBase";

const InputPost = () => {
  const { email, Login, createPost } = useProfile();
  const [imageUpload, setImageUpload] = useState(null);
  const [post, setPost] = useState({
    body: "",
    imageUrl: "",
    likes: 0,
  });

  const handlePostTextChange = (e) => {
    setPost({ ...post, body: e.target.value });
  };

  const uploadImage = async () => {
    if (imageUpload == null) {
      return;
    }
    const imageRef = ref(storage, `images/${v4()}`);
    await uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            setPost({ ...post, imageUrl: downloadURL });
            // Move createPost call inside this block
            createPost(post.body, downloadURL, post.likes);
          })
          .catch((error) => {
            // Handle any errors that occur while retrieving the download URL
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        // Handle any errors that occur during the upload process
        console.error("Error uploading image:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage();
    setPost({
      body: "",
      image: "",
      likes: 0,
    });
    setImageUpload(null);
  };

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto mb-8 mt-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-16 px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none"
          placeholder="What's on your mind?"
          value={post.body}
          onChange={handlePostTextChange}
        ></textarea>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
          className="block p-2 w-full bg-gray-100 border-t border-gray-300 focus:outline-none "
        />
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
