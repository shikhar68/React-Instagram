import { useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

const LikeFeature = () => {
  const [likeCount, setlikeCount] = useState(0);
  const [likecolor, setLikeColor] = useState(false);

  const handleLike = () => {
    if (!likecolor) {
      setlikeCount(likeCount + 1);
      setLikeColor(true);
    } else {
      setlikeCount(likeCount - 1);
      setLikeColor(false);
    }
  };
  return (
    <>
      <div>
        {likeCount}
        <div>
          {likecolor ? (
            <AiTwotoneHeart
              size={30}
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleLike}
            />
          ) : (
            <AiOutlineHeart
              size={30}
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LikeFeature;
