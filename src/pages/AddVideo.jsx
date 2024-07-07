import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { startLoading, stopLoading } from "@/redux/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError } from "@/redux/userSlice";
import { AXIOS_API } from "@/utils/axios";
import Loader from "@/components/Loader";

const AddVideo = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [allSeries, setAllSeries] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formData, setFormData] = useState({
    videoName: "",
    seriesName: "",
    season: "",
    description: "",
    rating: "",
    isHD: false,
  });

  useEffect(() => {
    const fetchAllSeries = async () => {
      const response = await AXIOS_API.get("/series/fetch-all-series");
      setAllSeries(response.data?.allSeries);
      console.log(allSeries);
    };

    fetchAllSeries();
  }, []);

  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setSelectedThumbnail(file);
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    const requiredFields = [
      "videoName",
      "seriesName",
      "season",
      "description",
      "rating",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0 || !selectedThumbnail || !selectedVideo) {
      alert(
        `Please fill in all required fields and upload both thumbnail and video.`
      );
      return;
    }

    dispatch(startLoading());

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (selectedThumbnail) {
      formDataToSend.append("thumbnail", selectedThumbnail);
    }
    if (selectedVideo) {
      formDataToSend.append("video", selectedVideo);
    }

    // Log each entry in formDataToSend
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await AXIOS_API.post(
        `/videos/upload-new-video`,
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
        navigate("/view-videos");
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
          {status.loading && <Loader />}
          <h1 className="font-extrabold text-3xl tracking-wide uppercase text-[#eeeeee]">
            Add Video
          </h1>
          <div className="flex w-full items-center justify-center flex-col pt-4">
            <form onSubmit={handleSubmit}>
              <div className="relative w-[70vw]">
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-transparent dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-2"
                >
                  {selectedThumbnail ? (
                    <img
                      src={URL.createObjectURL(selectedThumbnail)}
                      alt="Uploaded Thumbnail"
                      className="absolute inset-0 p-2 w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Upload Video Thumbnail (PNG, JPG or GIF)
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    id="thumbnail"
                    type="file"
                    className="hidden"
                    onChange={handleThumbnailChange}
                    accept="image/*"
                  />
                </label>
              </div>

              <div className="relative w-[70vw] mt-5">
                <label
                  htmlFor="video"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-transparent dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-2"
                >
                  {selectedVideo ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedVideo.name}
                    </p>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upload Video File
                      </p>
                    </div>
                  )}
                  <input
                    id="video"
                    type="file"
                    className="hidden"
                    onChange={handleVideoChange}
                    accept="video/*"
                  />
                </label>
              </div>

              <label
                htmlFor="videoName"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <input
                  type="text"
                  id="videoName"
                  placeholder="Video Name"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  value={formData.videoName}
                  onChange={handleChange}
                />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Video Name
                </span>
              </label>

              <label
                htmlFor="seriesName"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                {allSeries ? (
                  <select
                    name="seriesName"
                    id="seriesName"
                    className="bg-transparent peer w-full border-none border-gray-300 text-sm rounded-lg block py-2.5 text-white"
                    onChange={handleChange}
                    value={formData.seriesName}
                  >
                    <option value="" disabled>
                      Select a series
                    </option>
                    {allSeries.map((series) => (
                      <option
                        key={series._id}
                        className="bg-[#222] text-white border-none p-2"
                        value={series._id}
                      >
                        {series.seriesName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Loader />
                )}
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Series Name
                </span>
              </label>

              <label
                htmlFor="season"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <input
                  type="text"
                  id="season"
                  placeholder="Season"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  value={formData.season}
                  onChange={handleChange}
                />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Season
                </span>
              </label>

              <label
                htmlFor="description"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <textarea
                  className="peer h-20 w-full border-none bg-transparent p-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Description"
                  rows="4"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Description
                </span>
              </label>

              <label
                htmlFor="rating"
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
              >
                <input
                  type="text"
                  id="rating"
                  placeholder="Rating"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  value={formData.rating}
                  onChange={handleChange}
                />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  Rating
                </span>
              </label>

              <div className="flex items-center mt-5">
                <input
                  type="checkbox"
                  id="isHD"
                  checked={formData.isHD}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="isHD" className="text-sm text-gray-400">
                  Is HD
                </label>
              </div>

              <button
                type="submit"
                className="block w-[70vw] mt-5 py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
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

export default AddVideo;
