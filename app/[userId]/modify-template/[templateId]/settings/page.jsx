"use client";
import { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import upload from "../../../../utility/upload";
import axios from "axios";
import { toast } from "react-toastify";

const Tag = ({ children, setData, index }) => {
  return (
    <div className="bg-base-200 p-2 rounded-md flex items-center gap-2">
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

const Page = ({ params }) => {
  const ref = useRef();
  const [data, setData] = useState({
    title: "",
    description: "",
    topic: "",
    image: "",
    tags: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/template/${params.templateId}`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [params.templateId]);
  const [topic, setTopic] = useState([
    "Education",
    "Quiz",
    "Survey",
    "Feedback",
    "Other",
  ]);
  const [tags, setTags] = useState([]);
  const [tmpTag, setTmpTag] = useState("");
  const handleTag = (e) => {
    setData((data) => ({ ...data, tags: [...data.tags, tmpTag] }));
    setTmpTag("");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/tags/${tmpTag}`);
        setTags(response.data.tags);
      } catch (err) {
        console.log(err);
        setTags([]);
      }
    };
    fetchData();
  }, [tmpTag]);
  const handleSubmit = async () => {
    // console.log(data);
    // console.log(data.tags.join(","));
    try {
      const response = await axios.put("/api/template", { ...data, ...params });
      toast.success(response.data.message, { autoClose: 500 });
    } catch (err) {
      console.log(err);
      toast.error("Error updating template", { autoClose: 500 });
    }
  };
  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  const handleFileChange = async (e) => {
    const downloadURL = await upload(e.target.files[0]);
    setData((data) => ({ ...data, image: downloadURL }));
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div className="flex flex-col items-center p-8">
      <div>
        <h1 className="text-2xl font-bold mt-4">Settings</h1>
      </div>
      <div className="flex max-w-lg w-full justify-between bg-base-200 items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={data.title}
          type="text"
          name="title"
          className="p-2 focus:bg-base-300 focus:outline-none rounded-md border-b border-gray-300 w-full max-w-64"
          placeholder="Title"
        />
      </div>
      <div className="flex max-w-lg w-full justify-between bg-base-200 items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="description">Description</label>
        <textarea
          onChange={handleChange}
          value={data.description}
          type="description"
          name="description"
          className="p-2 focus:bg-base-300 focus:outline-none rounded-md border-b border-gray-300 w-full max-w-64"
          placeholder="description"
        />
      </div>
      <div className="flex max-w-lg w-full justify-between bg-base-200 items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="topic">Topic</label>
        <select
          onChange={handleChange}
          // value={data.topic}
          className="w-full max-w-64 p-2 border-b border-gray-300 rounded-md focus:bg-base-300 focus:outline-none"
          id="topic"
          name="topic"
          value={data.topic}
        >
          <option value="">None</option>
          {topic.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div className="flex max-w-lg w-full justify-between bg-base-200 items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="title">Image</label>
        <input
          onChange={handleFileChange}
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
      <div className="flex max-w-lg w-full justify-between bg-base-200 items-center p-4 m-4 rounded-md border-t-4 border-blue-300">
        <label htmlFor="tags">Tags</label>
        <div className="flex gap-2 w-full max-w-64 relative">
          <input
            onChange={(e) => {
              setTmpTag(e.target.value);
            }}
            value={tmpTag}
            type="text"
            name="tags"
            ref={ref}
            className="p-2 focus:bg-base-300 focus:outline-none rounded-md border-b border-gray-300 w-full max-w-64"
            placeholder="tags"
            autoComplete="off"
          />
          {tags.length > 0 && (
            <div className="absolute left-0 top-full mt-2 bg-base-300 p-4">
              {tags.map((tag, index) => (
                <button
                  key={index}
                  className="w-full text-left"
                  onClick={(e) => {
                    ref.current.value = e.target.innerText;
                    setTmpTag(e.target.innerText);
                    ref.current.focus();
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
          <button className="btn" onClick={handleTag}>
            Add
          </button>
        </div>
      </div>
      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Page;
