import { useEffect } from "react";

import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "../utils/api";
import axios from "axios";

type AuthData = {
  data: [boolean, object];
};

interface Data {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Home = () => {
  const auth = useLoaderData() as AuthData;
  console.log(auth);

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data as Data[];
    },
  });

  console.log(data);
  if (isLoading) return <div>Loading</div>;
  return data?.map((post) => {
    return <div>{post.title}</div>;
  });
};

export default Home;
