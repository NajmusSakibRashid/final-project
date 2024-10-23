"use client";
import axios from "axios";
import { toast } from "react-toastify";

const UserHomeF = ({ userId }) => {
  const createTemplate = async () => {
    try {
      const response = await axios.post("/api/template", { userId });
      toast.success(response.data.message, { autoClose: 500 });
      window.location.href = `/${userId}/modify-template/${response.data.templateId}/settings`;
    } catch (err) {
      // console.log(err);
      toast.error("Error creating template", { autoClose: 500 });
    }
  };
  return (
    <div className="flex">
      <button
        onClick={createTemplate}
        className="p-4 bg-yellow-100 rounded-2xl rounded-r-none m-px mt-4 min-w-44 text-center active:bg-yellow-200"
      >
        Create Template
      </button>
      <details className="dropdown">
        <summary className="cursor-pointer p-4 bg-yellow-100 rounded-2xl rounded-l-none m-px mt-4 min-w-44 text-center active:bg-yellow-200">
          Sort by
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-auto min-w-96 p-2 shadow border-2 border-gray-300">
          <li className="grid grid-cols-3 items-center gap-2 border-b-[1px] border-gray-300 justify-around">
            <div>Id</div>
            <div className="btn m-2">
              <a href="templates?sortBy=id&orderBy=asc">Ascending</a>
            </div>
            <div className="btn m-2">
              <a href="templates?sortBy=id&orderBy=desc">Descending</a>
            </div>
          </li>
          <li className="grid grid-cols-3 items-center gap-2 border-b-[1px] border-gray-300 justify-around">
            <div>Title</div>
            <div className="btn m-2">
              <a href="templates?sortBy=title&orderBy=asc">Ascending</a>
            </div>
            <div className="btn m-2">
              <a href="templates?sortBy=title&orderBy=desc">Descending</a>
            </div>
          </li>
          <li className="grid grid-cols-3 items-center gap-2 border-b-[1px] border-gray-300 justify-around">
            <div>Created At</div>
            <div className="btn m-2">
              <a href="templates?sortBy=createdat&orderBy=asc">Ascending</a>
            </div>
            <div className="btn m-2">
              <a href="templates?sortBy=createdat&orderBy=desc">Descending</a>
            </div>
          </li>
          <li className="grid grid-cols-3 items-center gap-2 border-b-[1px] border-gray-300 justify-around">
            <div>Modified At</div>
            <div className="btn m-2">
              <a href="templates?sortBy=modifiedat&orderBy=asc">Ascending</a>
            </div>
            <div className="btn m-2">
              <a href="templates?sortBy=modifiedat&orderBy=desc">Descending</a>
            </div>
          </li>
          <li className="grid grid-cols-3 items-center gap-2 border-b-[1px] border-gray-300 justify-around">
            <div>Topic</div>
            <div className="btn m-2">
              <a href="templates?sortBy=topic&orderBy=asc">Ascending</a>
            </div>
            <div className="btn m-2">
              <a href="templates?sortBy=topic&orderBy=desc">Descending</a>
            </div>
          </li>
        </ul>
      </details>
      {/* <button className="p-4 bg-yellow-100 rounded-2xl rounded-l-none m-px mt-4 min-w-44 text-center active:bg-yellow-200">
        Sort by
      </button> */}
    </div>
  );
};

export default UserHomeF;
