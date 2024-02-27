import InputPost from "../components/InputPost";
import PostList from "../components/PostList";
import LeftSidebar from "../components/LeftSidebar";

function Home() {
  return (
    <div className="flex flex-row justify-around w-full">
      <LeftSidebar />
      <div>
        <InputPost />
        <PostList />
      </div>
    </div>
  );
}

export default Home;
