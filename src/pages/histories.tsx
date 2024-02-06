import React, { useEffect, useState } from "react";
import Link from "next/link";
import ComponentLayout from "./layout";
import axios from "axios";
import Map from "../Components/map";
import { ClipLoading } from "@/config/appLoading";
import Trip from "@/Components/Trip";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [trips, setTrips] = useState([]);

  const displayHistories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/stripe/trips`);
      setTrips(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        setApiError(error.response.data.error);
      } else if (error.request) {
        alert(
          "Cannot reach the server. Please check your internet connection."
        );
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  useEffect(() => {
    displayHistories();
  }, []);

  console.log(trips);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setApiError("");
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiError]);

  return (
    <ComponentLayout pageName="OrderPage">
      <div className="relative h-full">
        <div className="h-1/3 md:h-full">
          <Map />
        </div>
        <div className="h-2/3 bg-white overflow-y-scroll flex flex-col items-center rounded-md md:absolute md:left-0 md:top-0 md:m-5 md:h-[85vh] md:w-[500px] shadow-md">
          <h2 className="w-full text-center font-bold text-[25px] border-b border-gray-300">
            Trips
          </h2>
          {loading ? (
            <ClipLoading size={40} />
          ) : !trips ? (
            <p>You have no trip history to display</p>
          ) : (
            trips.map((trip: any) => (
              <div
                key={trip._id}
                className="h-full w-full py-3 border-b border-gray-300"
              >
                <Trip trip={trip} />
              </div>
            ))
          )}
        </div>
      </div>
      <div
        className={`${
          !apiError ? " hidden" : "animate__fadeInUp"
        } animate__animated animate__delay-300ms absolute  bottom-[20px] flex h-fit w-full items-center justify-center p-[10px] `}
      >
        <div className="flex h-fit w-full max-w-[500px] items-center justify-center rounded border border-inherit bg-red-500 px-1 py-2 text-white shadow-lg">
          <p className="text-center font-semibold">{apiError}</p>
        </div>
      </div>
    </ComponentLayout>
  );
};

export default Order;
