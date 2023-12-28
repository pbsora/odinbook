import { API } from "../utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useFetchPosts = (params?: string) => {
  return useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      return API.get(`/post/?${params && "id=" + params}`);
    },
  });
};

export const useGetPostDetails = (params: string) => {
  return useQuery({
    queryKey: ["post-detail"],
    queryFn: async () => {
      return await API.get(`/post/${params}`);
    },
  });
};

export const useUserPosts = () => {
  //TODO
};

export const useLikePost = (post_id: string, user_id: string) => {
  return useMutation({
    mutationKey: ["likePost"],
    mutationFn: async () => {
      return await API.patch(`/post/like/${post_id}`, { user_id });
    },
  });
};

export const useUnlikePost = (post_id: string, user_id: string) => {
  return useMutation({
    mutationKey: ["unlikePost"],
    mutationFn: async () => {
      return await API.patch(`/post/unlike/${post_id}`, { user_id });
    },
  });
};

export const useDeletePost = (post_id: string) => {
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => {
      return await API.delete(`/post/${post_id}`);
    },
  });
};

export const useGetUser = (user_id: string) => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      return API.get(`/auth/${user_id}`);
    },
  });
};
