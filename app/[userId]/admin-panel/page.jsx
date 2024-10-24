import { sql } from "@vercel/postgres";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params, searchParams }) => {
  // console.log(params, searchParams);
  const { makeAdmin, removeAdmin, block, unblock, delete: del } = searchParams;
  const { userId } = params;

  try {
    if (makeAdmin) {
      await sql`update users1 set admin = now() where id = ${makeAdmin}`;
    }
    if (removeAdmin) {
      await sql`update users1 set admin = null where id = ${removeAdmin}`;
      if (removeAdmin === userId) {
        throw new Error("removeAdmin === userId");
      }
    }
    if (block) {
      await sql`update users1 set block = now() where id = ${block}`;
      if (block === userId) {
        throw new Error("block === userId");
      }
    }
    if (unblock) {
      await sql`update users1 set block = null where id = ${unblock}`;
    }
    if (del) {
      await sql`delete from users1 where id = ${del}`;
      if (del === userId) {
        throw new Error("del === userId");
      }
    }
  } catch (err) {
    console.log(err);
    return redirect("/");
  }

  const { rows } =
    await sql`select * from users1 where delete is null order by id`;
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-center p-4">Admin Panel</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Block</th>
            <th>Delete</th>
            <th>Visit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.username}</td>
              <td>{row.email}</td>
              <td>
                {(row.admin && (
                  <a href={`admin-panel?removeAdmin=${row.id}`}>
                    <button className="btn btn-warning min-w-36">
                      Remove Admin
                    </button>
                  </a>
                )) || (
                  <a href={`admin-panel?makeAdmin=${row.id}`}>
                    <button className="btn btn-primary min-w-36">
                      Make Admin
                    </button>
                  </a>
                )}
              </td>
              <td>
                {(row.block && (
                  <a href={`admin-panel?unblock=${row.id}`}>
                    <button className="btn btn-primary min-w-36">
                      Unblock
                    </button>
                  </a>
                )) || (
                  <a href={`admin-panel?block=${row.id}`}>
                    <button className="btn btn-warning min-w-36">Block</button>
                  </a>
                )}
              </td>
              <td>
                <a href={`admin-panel?delete=${row.id}`}>
                  <button className="btn btn-error min-w-36">Delete</button>
                </a>
              </td>
              <td>
                <a href={`/${row.id}/home-page/templates`}>
                  <button className="btn btn-primary min-w-36">Visit</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
