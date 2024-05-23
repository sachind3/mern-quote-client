import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="detailPage">
      <h2>{user.name}</h2>
      <h3 className="mb-2">{user.email}</h3>
      <div>
        <div className="infoMessageAlert">
          Total quotes: {user.quotes.length}
        </div>
      </div>
    </div>
  );
};
export default Profile;
