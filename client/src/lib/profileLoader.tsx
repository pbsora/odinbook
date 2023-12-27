import { API } from "../utils/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const profileLoader = async ({ params }: { params: any }) => {
  if (params) {
    const { data } = await API.get(`/auth/${params.user_id}`);
    return data;
  }
};
