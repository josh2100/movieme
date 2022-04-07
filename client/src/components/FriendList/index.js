import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_FRIEND } from "../../utils/mutations";

const FriendList = ({ username, friends }) => {
  const [deleteFriend] = useMutation(DELETE_FRIEND);

  if (!friends || !friends.length) {
    return <p className="">{username}, you have 0 friends. </p>;
  }

  const handleDeleteFriend = async (friendsId) => {
await deleteFriend({
  variables:{friendsId}
})
window.location.reload();
  };
  return (
    <div>
      <h5>{username}'s friends</h5>
      {friends.map((friend) => (
        <div key={friend._id}>
          <button className="pageLinks m-1" key={friend._id}>
            <Link to={`/profile/${friend._id}`} className="pageLinks">
              {friend.username}
            </Link>
          </button>
          <button
            className="m-1 pageLinks"
            onClick={() => {
              handleDeleteFriend(friend._id);
            }}
          >
            Delete Friend
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendList;
