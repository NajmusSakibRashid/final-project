import UserHomeNavbar from "../../components/UserHomeNavbar";

const Layout = ({ children, params: { userId } }) => {
  return (
    <div>
      <UserHomeNavbar userId={userId} />
      {children}
    </div>
  );
};

export default Layout;
