import { API } from "@/utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useLogin = (username: string, password: string) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      return await API.post("/auth/log-in", {
        username: username,
        password: password,
      });
    },
  });
};

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

export const useChangeUsername = (user_id: string, username: string) => {
  return useMutation({
    mutationKey: ["changeUsername"],
    mutationFn: async () => {
      return API.patch("/auth/profile/username", { user_id, username });
    },
  });
};

export const useConfirmPassword = (password: string, user_id: string) => {
  return useMutation({
    mutationKey: ["confirmPassword"],
    mutationFn: async () => {
      return API.post("/auth/profile/password", { password, user_id });
    },
  });
};

export const useChangePassword = (
  password: string,
  confirm_password: string,
  user_id: string
) => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async () => {
      return API.patch("/auth/profile/password/new", {
        password,
        confirm_password,
        user_id,
      });
    },
  });
};

export const useChangeName = (
  firstName: string,
  lastName: string,
  user_id: string
) => {
  return useMutation({
    mutationKey: ["changeName"],
    mutationFn: async () => {
      return API.patch("/auth/profile/name", { firstName, lastName, user_id });
    },
  });
};

export const useRegister = (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async () => {
      return await API.post("/auth/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      });
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

export const useGetFollowing = (user_id: string) => {
  return useQuery({
    queryKey: ["following"],
    queryFn: async () => {
      return API.get(`/relationship/following/${user_id}`);
    },
  });
};

export const useGetFollower = (user_id: string) => {
  return useQuery({
    queryKey: ["follower"],
    queryFn: async () => {
      return API.get(`/relationship/follower/${user_id}`);
    },
  });
};

export const useGetFollowCount = (user_id: string) => {
  return useQuery({
    queryKey: ["followCount"],
    queryFn: async () => {
      return API.get(`/relationship/count/${user_id}`);
    },
  });
};
