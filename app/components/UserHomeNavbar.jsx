import Link from "next/link";

const UserHomeNavbar = ({ userId }) => {
  return (
    <div className="bg-base-200 flex justify-center gap-8">
      <Link href={`/${userId}/home-page/templates`}>Templates</Link>
      <Link href={`/${userId}/home-page/forms`}>Forms</Link>
    </div>
  );
};

export default UserHomeNavbar;
