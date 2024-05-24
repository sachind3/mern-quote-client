import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { userQuotes } = useSelector((state) => state.quote);
  console.log(user);
  return (
    <div className="card">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <h3 className="mb-2">{user.email}</h3>
      <div>
        <div className="infoMessageAlert">
          Total quotes: {userQuotes.length}
        </div>
      </div>
    </div>
  );
};
export default Profile;
