import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";

const AllUsers = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS, {
    // Get data with a new fetch each time, not the cache
    // fetchPolicy: "network-only",
  });

  const [addFriend] = useMutation(ADD_FRIEND);

  const addPersons = async (friendsId) => {
    console.log("line 18", friendsId);
    await addFriend({
      variables: {
        friendsId,
      },
    });

    // if (error) {
    //     throw error
    // }

    console.log("Success!");
  };

  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="row d-flex justify-content-center">
      {data.users.map((user) => (
        <div
          className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 mb-4 ms-1 no-gutters d-flex justify-content-center"
          key={user._id}
        >
          <h2
            key={user.username}
            className="col-4 d-flex justify-content-center"
          >
            {user.username}
          </h2>

          <button
            onClick={() => addPersons(user._id)}
            className="m-1 pageLinks"
          >
            Add Friend
          </button>

          <button className="m-1 pageLinks" key={user._id}>
            <Link to={`/profile/${user._id}`} className="pageLinks">
              View Profile
            </Link>
          </button>
        </div>
      ))}
    </main>
  );
};

export default AllUsers;
