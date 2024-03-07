import useProfile from "../hooks/ProfileHook";
import PostShow from "./PostShow";

function PostList() {
  const getRandomId = () => {
    return parseInt(Math.random() * 10000);
  };
  const { posts } = useProfile();
  let renderedPosts = null;
  if (posts) {
    renderedPosts = posts.map((post) => {
      return (
        <div key={getRandomId()}>
          <PostShow post={post} />
        </div>
      );
    });
  } else {
    renderedPosts = "Loading";
  }

  return <div>{renderedPosts}</div>;
}

export default PostList;
