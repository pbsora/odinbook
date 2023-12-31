import { API } from "../../utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useFetchPosts = (params?: string) => {
  return useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      return await API.get(`/post/?${params && "id=" + params}`);
    },
  });
};

export const useFollowingPosts = (user_id?: string) => {
  return useQuery({
    queryKey: ["following-posts"],
    queryFn: async () => {
      return await API.get(`/relationship/post/${user_id}`);
    },
  });
};
