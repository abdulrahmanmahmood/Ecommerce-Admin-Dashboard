import { apiUrl } from "@/app/_utilize/axiosClient";
import axios from "axios";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const Blogs = ({ blog,getAllBlogandBosts }) => {
  const token = useSelector((state) => state.token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [closeInput, setCloseInput] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showFormForUpdateProduc, setShowFormForUpdateProduc] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  const [showInputForProductId, setShowInputForProductId] = useState("");

  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  const handleDeleteBlog = (blogId) => {
    // Implement logic to delete blog
    console.log("Delete blog with ID:", blogId);

    axios
      .delete(`${apiUrl}/content/post/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("Deleteing Bost succefully ", res.data);
        alert(res.data.message);
        getAllBlogandBosts()
      })
      .catch((error) => {
        console.log("error in deleting the Bost ", error);
      });
  };
  const handleUpdateBlog = (blogId) => {
    // Implement logic to update blog
    console.log("Update blog with ID:", blogId);

    try {
      axios
        .put(`${apiUrl}/content/post/update/${blogId}`, postData, {
          headers: {
            Authorization: `Bearer ${localToken ? localToken : token}`,
            "Accept-Language": "en",
          },
        })
        .then((res) => {
          console.log("success updating the post ", res.data);
          getAllBlogandBosts()
        });
    } catch (error) {
      console.log("error in updating the post ", error);
    }
  };
  const handleUploadImage = (e, blogId) => {
    // Implement logic to upload image
    console.log("Upload image for blog with ID:", blogId);

    e.preventDefault();
    if (!selectedFile) {
      console.error("No file selected");
      alert("Not Selected File");
      return;
    }

    if (selectedFile.size > 30 * 1024) {
      // 30 KB limit
      console.log("File size exceeds 30 KB");
      alert("File size exceeds 30 KB");
      return;
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile);
      axios
        .put(`${apiUrl}/content/post/picture/add/${blogId}`, formData, {
          headers: {
            Authorization: `Bearer ${localToken ? localToken : token}`,
            "Accept-Language": "en",
          },
        })
        .then((res) => {
          console.log("succesuflly upload image", res);
          setCloseInput(true);
          getAllBlogandBosts()
        })
        .catch((error) => {
          console.log("error in upload image ", error);
        });
    }

    console.log("selected file ", selectedFile);
  };
  const handleCloseInput = () => {
    setCloseInput(true);
  };
  const handleCahngeInput = (e) => {
    console.log("file selected ", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleShowForm = (blogId) => {
    setShowUpdateForm(true);
    setShowFormForUpdateProduc(blogId);
  };
  const handleAddPostImage = (blogId) => {
    setShowInputForProductId(blogId);
    setCloseInput(false);
  };
  const handleCloseUpdatingForm = () => {
    setShowFormForUpdateProduc(false);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSavingEdition = (e, blogId) => {
    e.preventDefault();

    handleUpdateBlog(blogId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
      {blog.pictureUrl && (
        <div className="mb-4">
          <img
            src={blog.pictureUrl}
            alt="Blog Image"
            className="w-full rounded-lg"
          />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.content}</p>
      <div className="flex items-center text-gray-500">
        <span className="mr-4">Likes: {blog.likes}</span>
        {/* Dislikes: {blog.dislikes} */} {/* Uncomment if needed */}
      </div>
      <p className="text-gray-400 text-sm mt-2">
        {/* Date Created: {new Date(blog.dateCreated).toLocaleDateString()} */}
      </p>
      <div className="flex items-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
          onClick={(e) => handleAddPostImage(blog.blogPostId)}
        >
          Upload Image
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded mr-2"
          onClick={() => handleShowForm(blog.blogPostId)}
        >
          Update Blog
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => handleDeleteBlog(blog.blogPostId)}
        >
          Delete Blog
        </button>
      </div>

      {showInputForProductId === blog.blogPostId && (
        <div
          className={`${
            closeInput ? "hidden" : "absolute"
          } absolute mx-auto my-auto p-5 items-center text-center border border-collapse rounded-2xl bg-slate-200 shadow-2xl text-blue-700 flex flex-col gap-4 top-0 right-[30%] `}
        >
          <form
            onSubmit={(e) => handleUploadImage(e, blog.blogPostId)}
            className=""
          >
            <input
              type="file"
              className="lg:w-[80%] w-[50%] p-3 m-3 items-center text-center grid grid-cols-1 lg:grid-row-2 "
              onChange={handleCahngeInput}
            />
            <button
              type="submit"
              className="p-2 m-4 bg-blue-400 text-white text-center rounded-xl"
            >
              Upload this image{" "}
            </button>
          </form>
          <div
            className="absolute top-5 right-5 text-3xl text-black"
            onClick={() => {
              handleCloseInput();
            }}
          >
            <IoMdCloseCircleOutline />
          </div>
        </div>
      )}

      {showUpdateForm && showFormForUpdateProduc === blog.blogPostId && (
        <div className=" items-center text-center lg:right-20 absolute w-full lg:w-[90%] shadow-2xl h-[80%] my-auto  lg:h-auto top-0 right-0">
          <div
            className="absolute top-2 right-2 text-3xl text-black "
            onClick={() => {
              handleCloseUpdatingForm();
            }}
          >
            <IoMdCloseCircleOutline />
          </div>
          <form
            action="#"
            className="space-y-4  w-full bg-slate-100 rounded-3xl mr-3 my-auto px-8 p-20  lg:py-4 text-center items-center  lg:h-auto"
            onSubmit={(e) => handleSavingEdition(e, blog.blogPostId)}
          >
            {/* <div> */}
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
                type="submit"
                className="inline-block w-full rounded-lg bg-blue-600 px-5 py-7 lg:py-3 font-medium text-white sm:w-auto"
              >
                save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Blogs;
