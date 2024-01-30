import { API } from "../../utils/api";
import { useMutation, useInfiniteQuery, useQuery } from "@tanstack/react-query";

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
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    queryFn: async ({ pageParam }) => {
      const response = await API.get(
        `/post/?${params && "id=" + params}&page=${pageParam}`
      );
      const { posts, nextPage } = response.data;

      if (response.data.message) {
        return {
          data: response.data.message,
          hasMore: false,
        };
      }

      return {
        data: posts,
        hasMore: nextPage,
      };
    },
  });
};

export const useFollowingPosts = (user_id: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["followingPosts"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    queryFn: async ({ pageParam }) => {
      const response = await API.get(
        `/relationship/post/${user_id}?page=${pageParam}`
      );
      const { posts, nextPage } = response.data;

      if (response.data.message) {
        return {
          data: response.data.message,
          hasMore: false,
        };
      }

      return {
        data: posts,
        hasMore: nextPage,
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

export const useGetPostDetails = (params: string) => {
  return useQuery({
    queryKey: ["post-detail"],
    queryFn: async () => {
      return await API.get(`/post/${params}`);
    },
  });
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

export const useDeleteComment = (comment_id: string) => {
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async () => {
      return await API.delete(`/post/comment/${comment_id}`);
    },
  });
};

export const useLikeComment = (comment_id: string, user_id: string) => {
  return useMutation({
    mutationKey: ["likeComment"],
    mutationFn: async () => {
      return await API.patch(`/post/comment/like/${comment_id}`, { user_id });
    },
  });
};

export const useUnlikeComment = (comment_id: string, user_id: string) => {
  return useMutation({
    mutationKey: ["unlikeComment"],
    mutationFn: async () => {
      return await API.patch(`/post/comment/unlike/${comment_id}`, { user_id });
    },
  });
};
