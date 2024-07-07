import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { startLoading, stopLoading } from "@/redux/statusSlice";
import { AXIOS_API } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Series = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const STATUS = useSelector((state) => state.status);
  const [series, setSeries] = useState();
  const [allEpisodes, setAllEpisodes] = useState();

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const response = await AXIOS_API.post(
          "/series/find-series",
          { seriesId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setSeries(response.data.seriesData);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };
    fetchSeriesData();
  }, []);

  useEffect(() => {
    const fetchAllEpisodesForSeries = async () => {
      try {
        const response = await AXIOS_API.post(
          "/series/fetch-episodes-for-series",
          { seriesId, seriesName: "AVC" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAllEpisodes(response.data.allEpisodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchAllEpisodesForSeries();
  }, [seriesId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeries((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      dispatch(startLoading());
      const response = await AXIOS_API.post(
        "/series/update-series",
        { ...series, seriesId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error updating series: ", error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(startLoading());

      const response = await AXIOS_API.post(
        "/series/delete-series",
        { seriesId: seriesId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response.data.success){
        navigate("/view-series")
      }
    } catch (error) {
      console.error("Error while deleting the series; ", error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <Navbar>
      {STATUS.loading && <Loader />}

      <div className="flex flex-col items-center p-10">
        <h1 className="font-bold text-3xl">Edit Series</h1>
        {series ? (
          <div className="flex flex-col items-center p-3">
            <label
              htmlFor="seriesName"
              className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 w-[70vw] mt-5"
            >
              <input
                type="text"
                id="seriesName"
                name="seriesName"
                placeholder="Series Name"
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={series.seriesName}
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
                placeholder="seriesDescription"
                rows="4"
                id="seriesDescription"
                name="seriesDescription"
                value={series.seriesDescription}
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
                name="createdBy"
                placeholder="Created By"
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={series.createdBy}
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
                name="dubbedBy"
                placeholder="Dubbed By"
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={series.dubbedBy}
                onChange={handleChange}
              />
              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Dubbed By
              </span>
            </label>

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
        ) : (
          <Loader />
        )}

        <div className="py-5 px-4 flex items-start justify-center flex-col flex-shrink flex-wrap">
          <h1 className="text-2xl my-5 font-bold">Episodes</h1>
          {allEpisodes ? (
            allEpisodes.map((episode) => {
              return (
                <article
                  key={episode._id}
                  className="overflow-hidden cursor-pointer rounded-lg hover:scale-105 ease-in-out duration-200 shadow transition hover:shadow-lg  max-w-[400px] relative"
                  onClick={() => {
                    navigate(`/video/${episode._id}`);
                  }}
                >
                  <img
                    alt={episode.videoName}
                    src={episode.thumbnail.thumbnailURL}
                    className="h-[169px] w-full object-cover bg-black"
                  />

                  <div className="bg-neutral-900 p-4">
                    <time
                      dateTime={episode.createdAt}
                      className="block text-xs text-gray-500"
                    >
                      {new Date(episode.createdAt).toLocaleDateString()}
                    </time>

                    <h3 className="mt-0.5 text-lg text-white truncate">
                      {episode.videoName}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {episode.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {episode.seriesName}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        S{episode.season}
                      </span>
                      {episode.isHD && (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                          HD
                        </span>
                      )}
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
                        {episode.rating}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default Series;
