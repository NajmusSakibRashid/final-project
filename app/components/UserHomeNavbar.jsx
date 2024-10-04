import Link from "next/link";

const UserHomeNavbar = () => {
  return (
    <div className="bg-white pt-16 flex justify-center gap-8">
      <Link href="templates">Templates</Link>
      <Link href="forms">Forms</Link>
    </div>
  );
};

export default UserHomeNavbar;
