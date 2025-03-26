import { useState } from "react";
import css from "./FollowButton.module.css";
import { followUser, unfollowUser } from "api/follow"; // to do!!!!!!!!!!!!!

const FollowButton = ({
  isFollowing: initialState,
  targetUserId,
  onStatusChange,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(targetUserId);
        setIsFollowing(false);
        onStatusChange?.(false);
      } else {
        await followUser(targetUserId);
        setIsFollowing(true);
        onStatusChange?.(true);
      }
    } catch (err) {
      console.error("Follow/unfollow failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`${css.button} ${isFollowing ? css.following : css.follow}`}
      onClick={handleToggle}
      disabled={loading}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
