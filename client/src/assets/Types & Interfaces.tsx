import React from "react";

export type ErrorResponse = {
  response: {
    data: {
      error: string;
    };
  };
};

export type AuthData = [boolean, UserType];

export type UserType = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  _id: string;
  image: string;
  createdAt: string;
};

export interface IUser {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

export type PostResponse = {
  _id: string;
  author_id: {
    createdAt: string;
    image: string;
    username: string;
    _id: string;
  };
  content: string;
  likes: [string];
  created_at: string;
};

export type OutletContext = { open: boolean };
