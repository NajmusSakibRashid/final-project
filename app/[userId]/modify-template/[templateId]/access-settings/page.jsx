"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const ref = useRef();
  const [privacy, setPrivacy] = useState("init");
  const [tmpUser, setTmpUser] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/template/${params.templateId}/access-settings`
        );
        setPrivacy(response.data.privacy);
        setSelectedUsers(response.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (privacy) => {
    if (!privacy) document.getElementById("my_modal").showModal();
    const fetchData = async () => {
      try {
        const response = await axios.put(
          `/api/template/${params.templateId}/access-settings`,
          { privacy }
        );
        console.log(response.data);
        toast.success(response.data.message, { autoClose: 500 });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/username/${tmpUser}`);
        console.log(response.data);
        setUsers(response.data.rows);
      } catch (err) {
        console.log(err);
        setUsers([]);
      }
    };
    fetchData();
  }, [tmpUser]);

  const saveHandler = async (e) => {
    // e.preventDefault();
    const fetchData = async () => {
      try {
        await axios.delete(
          `/api/template/${params.templateId}/access-settings`
        );
        const response = await axios.post(
          `/api/template/${params.templateId}/access-settings`,
          { users: selectedUsers }
        );
        console.log(response.data);
        toast.success(response.data.message, { autoClose: 500 });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div>
        <h1 className="text-2xl font-bold mt-4">Access Settings</h1>
      </div>
      <div className="flex flex-col max-w-lg w-full justify-between bg-base-100 items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              className="cursor-pointer"
              type="radio"
              name="public"
              value={true}
              checked={privacy}
              onClick={(e) => {
                setPrivacy(true);
                handleChange(true);
              }}
              onChange={(e) => {}}
            />
          </div>
          <div>
            <span>Allow public access.</span>
          </div>
          <div>
            <input
              className="cursor-pointer"
              type="radio"
              name="public"
              value={false}
              checked={!privacy}
              onClick={(e) => {
                setPrivacy(false);
                handleChange(false);
              }}
              onChange={(e) => {}}
            />
          </div>
          <div className="flex gap-2">
            <div>Allow custom access.</div>
            <button
              onClick={() => document.getElementById("my_modal").showModal()}
            >
              <IoMdSettings />
            </button>
          </div>
          <dialog className="modal" id="my_modal">
            <div className="modal-box overflow-visible h-auto">
              <div className="flex w-full justify-center">
                <div className="relative">
                  <input
                    type="text"
                    name="user"
                    className="border-2 p-2 rounded-l-full focus:outline-none"
                    placeholder="Search user"
                    ref={ref}
                    onChange={(e) => setTmpUser(e.target.value)}
                    value={tmpUser}
                  />
                  {users.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 bg-base-300 w-full p-2">
                      {users.map((user, index) => (
                        <div
                          key={index}
                          className="border-b-2 border-white flex justify-between items-center"
                        >
                          <div>{user.username}</div>
                          <button
                            onClick={() => {
                              setSelectedUsers((selectedUsers) => [
                                ...selectedUsers,
                                user,
                              ]);
                              setUsers([]);
                              setTmpUser("");
                            }}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="border-2 p-2 pl-4 pr-4 rounded-r-full flex items-center">
                  <CiSearch />
                </button>
              </div>

              <div className="flex flex-wrap">
                {selectedUsers.map((user, index) => (
                  <div
                    key={index}
                    className="bg-base-300 p-2 m-2 rounded-md flex gap-2 items-center"
                  >
                    <div>{user.username}</div>
                    <button
                      onClick={() => {
                        setSelectedUsers((selectedUsers) =>
                          selectedUsers.filter((u, i) => i !== index)
                        );
                      }}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>

              <div className="modal-action">
                <form method="dialog" className="flex gap-4">
                  <button className="btn">Cancel</button>
                  <button className="btn" onClick={saveHandler}>
                    Save
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Page;
