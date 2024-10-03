"use client";
import { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Tag = ({ children, setData, index }) => {
  return (
    <div className="bg-white p-2 rounded-md flex items-center gap-2">
      {children}
      <button
        onClick={() => {
          setData((data) => ({
            ...data,
            tags: data.tags.filter((tag, i) => i !== index),
          }));
        }}
      >
        <RxCross2 />
      </button>
    </div>
  );
};

const Page = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    topic: "",
    image: "",
    tags: [],
  });
  const [topic, setTopic] = useState([
    "Education",
    "Quiz",
    "Survey",
    "Feedback",
    "Other",
  ]);
  const [tags, setTags] = useState(["ababa", "babab", "ababab", "bababa"]);
  const ref = useRef(null);
  const handleTag = (e) => {
    setData((data) => ({ ...data, tags: [...data.tags, ref.current.value] }));
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-2xl font-bold mt-4">Settings</h1>
      </div>
      <div className="flex max-w-lg w-full justify-between bg-white items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="p-2 focus:bg-base-300 focus:outline-none rounded-md border-b border-gray-300 w-full max-w-64"
          placeholder="Title"
        />
      </div>
      <div className="flex max-w-lg w-full justify-between bg-white items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="description">Description</label>
        <textarea
          type="description"
          name="description"
          className="p-2 focus:bg-base-300 focus:outline-none rounded-md border-b border-gray-300 w-full max-w-64"
          placeholder="description"
        />
      </div>
      <div className="flex max-w-lg w-full justify-between bg-white items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="topic">Topic</label>
        <select
          className="w-full max-w-64 p-2 border-b border-gray-300 rounded-md focus:bg-base-300 focus:outline-none"
          id="topic"
          name="topic"
          defaultValue={topic[0]}
        >
          {topic.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div className="flex max-w-lg w-full justify-between bg-white items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="title">Image</label>
        <input
          type="file"
          name="image"
          className="p-2 focus:bg-base-300 focus:outline-none rounded-md border-b border-gray-300 w-full max-w-64"
          placeholder="image"
        />
      </div>
      <div className="flex flex-wrap w-full max-w-lg gap-2">
        {data.tags.map((tag, index) => (
          <Tag key={index} index={index} setData={setData}>
            {tag}
          </Tag>
        ))}
      </div>
      <div className="flex max-w-lg w-full justify-between bg-white items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="tags">Tags</label>
        <div className="flex gap-2 w-full max-w-64 relative">
          <input
            type="text"
            name="tags"
            className="p-2 focus:bg-base-300 focus:outline-none rounded-md border-b border-gray-300 w-full max-w-64"
            placeholder="tags"
            ref={ref}
          />
          <div className="absolute left-0 top-full mt-2 bg-base-300 p-4">
            {tags.length > 0 &&
              tags.map((tag, index) => (
                <button
                  key={index}
                  className="w-full text-left"
                  onClick={(e) => (ref.current.value = e.target.innerText)}
                >
                  {tag}
                </button>
              ))}
          </div>
          <button className="btn" onClick={handleTag}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
