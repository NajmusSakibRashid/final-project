import Link from "next/link";

const UserHomeF = ({ children, path }) => {
  return (
    <div className="flex justify-center">
      <details className="dropdown">
        <summary className="cursor-pointer p-4 bg-yellow-100 rounded-2xl m-px mt-4 min-w-44 text-center active:bg-yellow-200">
          Sort by
        </summary>
        <ul className="menu dropdown-content translate-x--1/2 bg-base-100 rounded-box z-[1] w-auto min-w-[48rem] p-2 shadow border-2 border-gray-300">
          {children.map((child, index) => (
            <li
              key={index}
              className="grid grid-cols-3 items-center gap-2 border-b-[1px] border-gray-300 justify-around"
            >
              <div className="capitalize">{child}</div>
              <div className="btn m-2">
                {/* <Link href={`templates?sortBy=${child}&orderBy=asc`}> */}
                <a href={`${path}?sortBy=${child}&orderBy=asc`}>Ascending</a>
              </div>
              <div className="btn m-2">
                {/* <Link href={`templates?sortBy=${child}&orderBy=desc`}> */}
                <a href={`${path}?sortBy=${child}&orderBy=desc`}>Descending</a>
              </div>
            </li>
          ))}
        </ul>
      </details>
      {/* <button className="p-4 bg-yellow-100 rounded-2xl rounded-l-none m-px mt-4 min-w-44 text-center active:bg-yellow-200">
        Sort by
      </button> */}
    </div>
  );
};

export default UserHomeF;
