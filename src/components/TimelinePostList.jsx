import useProfile from "../hooks/ProfileHook";
import PostShow from "./PostShow";

function TimelinePostList() {
  const getRandomId = () => {
    return parseInt(Math.random() * 10000);
  };
  const { timelinePosts } = useProfile();
  let renderedPosts = null;
  if (timelinePosts) {
    renderedPosts = timelinePosts.map((post) => {
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

export default TimelinePostList;
