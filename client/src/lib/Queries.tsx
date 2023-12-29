import { API } from "../utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useFetchPosts = (params?: string) => {
  return useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      return await API.get(`/post/?${params && "id=" + params}`);
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
      return await API.get(`/auth/${user_id}`);
    },
  });
};

export const useComment = (
  post_id: string,
  author_id: string,
  content: string
) => {
  return useMutation({
    mutationKey: ["newComment"],

    mutationFn: async () => {
      return await API.post(`/post/${post_id}/comment`, {
        author_id,
        content,
      });
    },
  });
};

export const useGetComments = (post_id: string) => {
  return useQuery({
    queryKey: ["getComments"],
    queryFn: async () => {
      return await API.get(`/post/${post_id}/comment`);
    },
  });
};
