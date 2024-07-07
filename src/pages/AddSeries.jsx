import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { startLoading, stopLoading } from "@/redux/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError } from "@/redux/userSlice";
import { AXIOS_API } from "@/utils/axios";
import Loader from "@/components/Loader";

const AddSeries = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    seriesName: "",
    seriesDescription: "",
    createdBy: "",
    dubbedBy: "",
    banner: selectedFile,
    fileUploaded: false,
  });

  const STATUS = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    setFormData({
      ...formData,
      fileUploaded: true,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(startLoading());

    const formDataToSend = new FormData();
    formDataToSend.append("seriesName", formData.seriesName);
    formDataToSend.append("seriesDescription", formData.seriesDescription);
    formDataToSend.append("createdBy", formData.createdBy);
    formDataToSend.append("dubbedBy", formData.dubbedBy);
    formDataToSend.append("banner", selectedFile);

    try {
      const response = await AXIOS_API.post(
        `/series/create-new-series`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);

      if (response.data.success) {
        dispatch(stopLoading());
        navigate("/view-series");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(stopLoading());
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        dispatch(setError(error.response.data.message));
      } else if (error.request) {
        console.error("No response received:", error.request);
        dispatch(setError("No response received from the server."));
      } else {
        console.error("Error in setting up the request:", error.message);
        dispatch(setError("Error in setting up the request."));
      }
    }
  };

  return (
    <>
      <Navbar>
        <div className="flex items-center w-full justify-center flex-col py-9">
          {STATUS.loading && <Loader />}
          <h1 className="font-extrabold text-3xl tracking-wide uppercase text-[#eeeeee]">
            Add Series
          </h1>
          <div className="flex w-full items-center justify-center flex-col pt-4">
            <form onSubmit={handleSubmit}>
              <div className="relative w-[70vw]">
                <label
                  htmlFor="banner"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-transparent dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-2"
                >
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Uploaded"
                      className="absolute inset-0 p-2 w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className={`w-8 h-8 mb-4 ${
                            formData.fileUploaded
                              ? "text-green-500"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    id="banner"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <label
                htmlFor="seriesName"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <input
                  type="text"
                  id="seriesName"
                  placeholder="Series Name"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  value={formData.seriesName}
                  onChange={handleChange}
                />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Series Name
                </span>
              </label>
              <label
                htmlFor="seriesDescription"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <textarea
                  className="peer h-20 w-full border-none bg-transparent p-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Series Description"
                  rows="8"
                  id="seriesDescription"
                  value={formData.seriesDescription}
                  onChange={handleChange}
                ></textarea>
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Series Description
                </span>
              </label>
              <label
                htmlFor="createdBy"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <input
                  type="text"
                  id="createdBy"
                  placeholder="Created By"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  value={formData.createdBy}
                  onChange={handleChange}
                />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Created By
                </span>
              </label>
              <label
                htmlFor="dubbedBy"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <input
                  type="text"
                  id="dubbedBy"
                  placeholder="Dubbed By"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  value={formData.dubbedBy}
                  onChange={handleChange}
                />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Dubbed By
                </span>
              </label>

              <button
                type="submit"
                className="block w-[70vw] mt-5 py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={handleSubmit}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default AddSeries;
