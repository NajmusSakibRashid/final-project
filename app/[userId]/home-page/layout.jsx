import UserHomeNavbar from "../../components/UserHomeNavbar";

const Layout = ({ children }) => {
  return (
    <div>
      <UserHomeNavbar />
      {children}
    </div>
  );
};

export default Layout;
