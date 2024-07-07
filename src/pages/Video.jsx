import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { startLoading, stopLoading } from "@/redux/statusSlice";
import { setError } from "@/redux/userSlice";
import { AXIOS_API } from "@/utils/axios";
import Loader from "@/components/Loader";
import HLSPlayer from "@/components/HLSPlayer";
import Navbar from "@/components/Navbar";

const Video = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allSeries, setAllSeries] = useState(null);
  const STATUS = useSelector((state) => state.status);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findVideo = async () => {
      dispatch(startLoading());
      setError(null);
      try {
        const response = await AXIOS_API.post(
          "/videos/find-video",
          { videoId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.success && response.data.videoData) {
          setVideo(response.data.videoData);
        } else {
          throw new Error(
            response.data?.message || "Failed to fetch video data"
          );
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setError(error.message || "An error occurred while fetching the video");
        dispatch(
          setError(
            error.message || "An error occurred while fetching the video"
          )
        );
      } finally {
        dispatch(stopLoading());
      }
    };

    if (videoId) {
      findVideo();
    }
  }, [dispatch, videoId]);

  useEffect(() => {
    const fetchAllSeries = async () => {
      const response = await AXIOS_API.get("/series/fetch-all-series");
      setAllSeries(response.data?.allSeries);
    };

    fetchAllSeries();
  }, []);

  useEffect(() => {}, [video]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (STATUS.loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!video || !video.videoData || !video.videoData.videoURL) {
    return <div>Video not found or invalid data</div>;
  }

  const handleUpdate = async () => {
    try {
      dispatch(startLoading());
      setError(null);
      const response = await AXIOS_API.post(
        `/videos/update-video`,
        { ...video, videoId: video._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating video:", error);
      setError(error.message || "An error occurred while updating the video");
      dispatch(
        setError(error.message || "An error occurred while updating the video")
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleDelete = async () => {
    try {
      let confirmation = confirm("Are you sure you want to delete the video?");
      if (confirmation) {
        dispatch(startLoading());
        const response = await AXIOS_API.post(
          "/videos/delete-video",
          { videoId: video._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          alert("Video Deleted Successfully");
        }
        navigate("/view-videos");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      setError(error.message || "An error occurred while deleting the video");
      dispatch(
        setError(error.message || "An error occurred while deleting the video")
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <Navbar>
      {STATUS.loading && <Loader />}
      <div className="container mx-auto px-4 py-5">
        <div className="w-full max-w-[100%] mx-auto">
          <HLSPlayer src={video.videoData.videoURL} />

          <div>
            <label
              htmlFor="videoName"
              className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
            >
              <input
                type="text"
                id="videoName"
                name="videoName"
                placeholder="Video Name"
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={video.videoName}
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
                  value={video.seriesName}
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
              htmlFor="description"
              className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
            >
              <textarea
                className="peer h-20 w-full border-none bg-transparent p-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Description"
                rows="4"
                id="description"
                name="description"
                value={video.description}
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
                name="rating"
                placeholder="Rating"
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={video.rating}
                onChange={handleChange}
              />
              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Rating
              </span>
            </label>

            <label
              htmlFor="season"
              className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
            >
              <input
                type="text"
                id="season"
                name="season"
                placeholder="Season"
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={video.season}
                onChange={handleChange}
              />
              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Season
              </span>
            </label>

            <div className="flex items-center mt-5">
              <input
                type="checkbox"
                id="isHD"
                name="isHD"
                checked={video.isHD}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isHD" className="text-sm text-gray-400">
                Is HD
              </label>
            </div>
            <button
              onClick={handleUpdate}
              className="block w-[70vw] mt-5 py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="block w-[70vw] mt-5 py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Video;
