import { API } from "../utils/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      return API.get("post/");
    },
  });
};

export const useUserPosts = () => {
  //TODO
};
