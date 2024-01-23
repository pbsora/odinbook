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
