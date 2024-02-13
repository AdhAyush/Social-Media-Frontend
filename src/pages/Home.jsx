import useProfile from "../hooks/ProfileHook";

function Home() {
  const { profiles } = useProfile();
  console.log(profiles);
  return <div>Home</div>;
}

export default Home;
