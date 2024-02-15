import useProfile from "../hooks/ProfileHook";
import PostShow from "./PostShow";

function PostList() {
  const { posts } = useProfile();
  let renderedPosts = null;
  if (posts) {
    renderedPosts = posts.map((post) => {
      return (
        <div key={post.id}>
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
