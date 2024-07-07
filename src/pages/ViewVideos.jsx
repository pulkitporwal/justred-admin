import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { startLoading, stopLoading } from "@/redux/statusSlice";
import { setError } from "@/redux/userSlice";
import { AXIOS_API } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewVideos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const STATUS = useSelector((state) => state.status);
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      dispatch(startLoading());
      try {
        const response = await AXIOS_API.get("/videos/fetch-all-videos");
        console.log("RESPONSE ", response);
        setAllVideos(response.data.allVideos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        dispatch(setError(error))
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchAllVideos();
  }, [dispatch]);

  return (
    <>
      <Navbar>
        {STATUS.loading && <Loader />}
        <div className="flex flex-wrap flex-shrink justify-start items-start gap-6 p-10">
          {allVideos.map((video) => (
            <article
              key={video._id}
              className="overflow-hidden cursor-pointer rounded-lg hover:scale-105 ease-in-out duration-200 shadow transition hover:shadow-lg  max-w-[400px]"
              onClick={() => {
                navigate(`/video/${video._id}`);
              }}
            >
              <img
                alt={video.videoName}
                src={
                  video.thumbnail.thumbnailURL ||
                  "https://via.placeholder.com/300x169.png?text=Video+Thumbnail"
                }
                className="h-[169px] w-full object-cover bg-black"
              />

              <div className="bg-neutral-900 p-4">
                <time
                  dateTime={video.createdAt}
                  className="block text-xs text-gray-500"
                >
                  {new Date(video.createdAt).toLocaleDateString()}
                </time>

                <h3 className="mt-0.5 text-lg text-white truncate">
                  {video.videoName}
                </h3>

                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {video.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {video.seriesName}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    S{video.season}
                  </span>
                  {video.isHD && (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                      HD
                    </span>
                  )}
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
                    {video.rating}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Navbar>
    </>
  );
};

export default ViewVideos;
