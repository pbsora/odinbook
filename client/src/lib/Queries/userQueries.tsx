import { API } from "@/utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetRelationship = (follower: string, following: string) => {
  return useQuery({
    queryKey: ["getRelationship"],
    queryFn: async () => {
      return API.get(`/relationship/${follower}/${following}`);
    },
  });
};

export const useFollow = (follower: string, following: string) => {
  return useMutation({
    mutationKey: ["follow"],
    mutationFn: async () => {
      return API.post("/relationship/follow", { follower, following });
    },
  });
};

export const useUnfollow = (follower: string, following: string) => {
  return useMutation({
    mutationKey: ["unfollow"],
    mutationFn: async () => {
      return API.delete(`/relationship/${follower}/${following}`);
    },
  });
};

export const useChangePicture = (form: FormData) => {
  return useMutation({
    mutationKey: ["changePicture"],
    mutationFn: async () => {
      return API.patch("/auth/profile/picture", form);
    },
  });
};

export const useChangeDesc = (desc: string, user_id: string) => {
  return useMutation({
    mutationKey: ["description"],
    mutationFn: async () => {
      return API.patch("/auth/profile/description", {
        description: desc,
        user_id,
      });
    },
  });
};
