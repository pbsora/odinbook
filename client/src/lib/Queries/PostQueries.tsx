import { API } from "../../utils/api";
import { useMutation, useInfiniteQuery } from "@tanstack/react-query";

/* export const useFetchPosts = (page: number, params?: string) => {
  return useQuery({
    queryKey: ["all-posts"],
    enabled: false,
    queryFn: async () => {
      return await API.get(`/post/?${params && "id=" + params}&page=${page}`);
    },
  });
}; */

/* export const useFetchPosts = (params = "") => {
  return useInfiniteQuery({
    queryKey: ["all-posts"],
    queryFn: async ({ pageParam }) => {
      return await API.get(`/post/?${params && "id=" + params}`);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage;
    },
  });
}; */

export const useFetchPosts = (params?: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["all-posts"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any, pages) => {
      return pages.length + 1;
    },
    queryFn: async ({ pageParam }) => {
      return await API.get(
        `/post/?${params && "id=" + params}&page=${pageParam}`
      );
    },
  });
};

export const useFollowingPosts = (user_id: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["followingPosts"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any, pages) => {
      return pages.length + 1;
    },
    queryFn: async ({ pageParam }) => {
      const response = await API.get(
        `/relationship/post/${user_id}?page=${pageParam}`
      );
      const posts = response.data;

      // Check if there are no more posts
      const hasMorePosts = posts.length > 0;
      return {
        data: posts,
        hasMore: hasMorePosts,
      };
    },
  });
};

export const usePostMutation = (form: FormData) => {
  return useMutation({
    mutationKey: ["newPost"],
    mutationFn: async () => {
      return await API.post("post/new-post", form);
    },
  });
};
