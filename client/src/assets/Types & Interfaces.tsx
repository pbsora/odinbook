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
};

export interface IUser {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}
