import ProfileContext from "../context/Profile";
import { useContext } from "react";

function useProfileHook() {
  const useProfile = useContext(ProfileContext);
  return useProfile;
}

export default useProfileHook;
