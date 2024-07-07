import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { startLoading, stopLoading } from "@/redux/statusSlice";
import { AXIOS_API } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ViewSeries = () => {
  const navigate = useNavigate();
  const [allSeries, setAllSeries] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(startLoading());
      const fetchAllSeries = async () => {
        const response = await AXIOS_API.get("/series/fetch-all-series");
        setAllSeries(response.data?.allSeries || []);
      };

      fetchAllSeries();
    } catch (error) {
      console.error("Error while fetching series data: ", error);
    } finally {
      dispatch(stopLoading());
    }
  }, []);

  return (
    <Navbar>
      <div className="p-10 flex items-center justify-start flex-wrap flex-shrink gap-10">
        {allSeries &&
          allSeries.map((series) => (
            <div
              key={series._id}
              className="w-[200px] hover:-translate-y-3 transition-all ease-in-out duration-200 overflow-hidden rounded-xl bg-red-200"
            >
              <Link to={`/series/${series._id}`}>
                <img
                  src={series.banner.bannerURL}
                  className="w-full  object-contain"
                  alt={series.title}
                />
              </Link>
            </div>
          ))}
      </div>
    </Navbar>
  );
};

export default ViewSeries;
