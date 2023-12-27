import { useParams } from "react-router-dom";

const Post = () => {
  const { post_id } = useParams();
  console.log(post_id);

  return <div className="w-[60vw] border"></div>;
};
export default Post;
