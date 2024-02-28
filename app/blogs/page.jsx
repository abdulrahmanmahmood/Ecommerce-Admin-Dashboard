"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../_utilize/axiosClient";
import Blogs from "./_components/Blogs";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  useEffect(() => {
    getAllBlogandBosts();
  }, []);
  typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  const getAllBlogandBosts = () => {
    axios
      .get(`${apiUrl}/public/post/all`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("fetching Blogs successfuly", res.data.data.posts);
        setBlogs(res.data.data.posts);
      })
      .catch((error) => {
        console.log("error in fethcing Blogs", error);
      });
  };
  const AddBlog = () => {
    axios
      .post(`${apiUrl}/content/post/new`, postData, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("fetching AddBlogs successfuly", res);
        setPostData({
          title: "",
          content: "",
        });
        getAllBlogandBosts();
      })
      .catch((error) => {
        console.log("error in fethcing AddBlogs", error);
      });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  return (
    <div>
      <Header />
      <div className=" mx-auto w-[90%] rounded-2xl bg-slate-300 mt-10 text-center">
        <h3 className="p-3 text-2xl bg-slate-400 w-[300px] rounded-xl mx-auto ">
          ADD Post
        </h3>
        <div className="w-[90%] mx-auto mt-8">
          <form action="#" className="space-y-4">
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="title"
                type="text"
                id="title"
                value={postData.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="content"
                rows="8"
                id="content"
                value={postData.content}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-block w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
                onClick={AddBlog}
              >
                Add Post
              </button>

              {/* {allFieldsFilled ? (
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
                >
                  Send Enquiry
                </button>
              ) : (
                <div className="text-red-500 text-xl m-3 p-3 ">
                  <button
                    // type="submit"
                    className="inline-block w-full rounded-lg z-20 bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
                  >
                    Send Enquiry
                  </button>
                </div>
              )} */}
            </div>
          </form>
        </div>
      </div>
      {/* <button onClick={AddBlog}>Add Blog </button> */}
      {blogs.map((blog) => (
        <Blogs
          blog={blog}
          key={blog.blogPostId}
          getAllBlogandBosts={getAllBlogandBosts}
        />
      ))}
    </div>
  );
};

export default page;
