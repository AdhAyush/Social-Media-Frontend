import InputPost from "../components/InputPost";
import PostList from "../components/PostList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

function Home() {
  return (
    <div className="flex flex-row w-full justify-center">
      <LeftSidebar />
      <div>
        <InputPost />
        <PostList />
      </div>
      <RightSidebar />
    </div>
  );
}

export default Home;
