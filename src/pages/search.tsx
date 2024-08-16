import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import SavePlaces from "../component_temp/data/SavePlaces";
import Map from "../component_temp/data/map";
import axios from "axios";
import ComponentLayout from "./layout";
import { DotsLoading, FadeLoading } from "../config/appLoading";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Destination {
  _id: string;
  pickup: string;
  dropoff: string;
}

const Search = () => {
  const [pickup, setpickup] = useState("");
  const [dropoff, setdropoff] = useState("");
  const [destination, setDestination] = useState<any | never>([]);
  const [refreshLocation, setRefreshLocation] = useState(true);
  const [apiError, setApiError] = useState("");
  const [placeLoading, setPlaceLoading] = useState(false);
  const [savePlaceLoading, setSavePlaceLoading] = useState(false);
  const [deletePlaceLoading, setDeletePlaceLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const { data: session, status } = useSession();

  const saveLocationItem = async () => {
    if (!session) {
      alert("Sign in first before you can save destinations");
    }
    setSavePlaceLoading(true);
    const product = {
      pickup: pickup.trim(),
      dropoff: dropoff.trim(),
    };
    try {
      const { data } = await axios.post("/api/destination/create", product);
      setDestination([data, ...destination]);
      setSavePlaceLoading(false);
    } catch (error: any) {
      if (error.response) {
        setApiError(error.response.data.error);
        setSavePlaceLoading(false);
      } else if (error.request) {
        alert(
          "Cannot reach the server. Please check your internet connection."
        );
        setSavePlaceLoading(false);
      } else {
        console.error("Error:", error.message);
        setSavePlaceLoading(false);
      }
    }
  };

  const deleteLocationItem = async (destinationId: string) => {
    setDeletePlaceLoading((prevSelectLoading: any) => ({
      ...prevSelectLoading,
      [destinationId]: true,
    }));
    try {
      const response = await axios.delete(`/api/destination/${destinationId}`);
      setRefreshLocation(true);
      if (response.status === 200) {
        console.log("Location Deleted successfully");
      }
      setDeletePlaceLoading((prevSelectLoading: any) => ({
        ...prevSelectLoading,
        [destinationId]: false,
      }));
    } catch (error: any) {
      if (error.response) {
        setApiError(error.response.data.error);
        setDeletePlaceLoading((prevSelectLoading: any) => ({
          ...prevSelectLoading,
          [destinationId]: false,
        }));
      } else if (error.request) {
        alert(
          "Cannot reach the server. Please check your internet connection."
        );
        setDeletePlaceLoading((prevSelectLoading: any) => ({
          ...prevSelectLoading,
          [destinationId]: false,
        }));
      } else {
        console.error("Error:", error.message);
        setDeletePlaceLoading((prevSelectLoading: any) => ({
          ...prevSelectLoading,
          [destinationId]: false,
        }));
      }
    }
  };

  const displayLocation = async () => {
    setRefreshLocation(false);
    setPlaceLoading(true);
    try {
      const { data } = await axios.get(`/api/destination/getAll`);
      setDestination(data);
      setPlaceLoading(false);
    } catch (error: any) {
      if (error.response) {
        setApiError(error.response.data.error);
        setPlaceLoading(false);
      } else if (error.request) {
        alert(
          "Cannot reach the server. Please check your internet connection."
        );
        setPlaceLoading(false);
      } else {
        console.error("Error:", error.message);
        setPlaceLoading(false);
      }
    }
  };
  useEffect(() => {
    displayLocation();
  }, [refreshLocation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setApiError("");
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiError]);

  return (
    <ComponentLayout pageName="SearchPage">
      <div className="relative h-full">
        <div className="h-1/3 md:h-full">
          <Map />
        </div>
        <div className=" flex h-2/3  flex-col md:rounded-md pb-2 md:pb-0 bg-gray-200 md:absolute md:m-5 md:left-0 md:top-0 md:h-[85vh] md:w-1/2 shadow-lg">
          <div className="bg-gray-200 text-gray-500 px-4 py-1 text-2xl md:rounded-t-md">
            Go anywhere with Uber
          </div>
          <div className="bg-gray-200 py-2 px-4 ">
            Request a ride, hop in, and go
          </div>
          <div className="mb-3 flex items-center bg-white px-4">
            <div className="z-10 ml-2 flex w-10 flex-col items-center">
              <Image
                alt=""
                src="/images/filled-circle.png"
                height={6}
                width={6}
                aria-hidden
              />
              <Image
                className="my-1.5 h-10"
                alt=""
                src="/images/vertical-line.png"
                height={30}
                width={10}
                aria-hidden
              />
              <Image
                alt=""
                src="/images/square-full.png"
                height={8}
                width={8}
                aria-hidden
              />
            </div>
            <div className="flex flex-1 flex-col">
              <input
                className="z-index-10 my-2 ml-[-40px] h-10  rounded-md border-none bg-gray-200 pl-10 capitalize outline-none"
                placeholder="Enter location"
                value={pickup}
                onChange={(e) => setpickup(e.target.value)}
              />
              <input
                className="z-index-10 my-2 ml-[-40px] h-10  rounded-md border-none bg-gray-200 pl-10 capitalize outline-none"
                placeholder="Enter destination"
                value={dropoff}
                onChange={(e) => setdropoff(e.target.value)}
              />
            </div>
            <button onClick={saveLocationItem} disabled={savePlaceLoading}>
              {savePlaceLoading ? (
                <div className="ml-3 h-10 w-10 rounded-full bg-gray-200 pl-[15px] pt-3">
                  <FadeLoading height={8} width={4} margin={-8} />
                </div>
              ) : (
                <Image
                  className="ml-3 rounded-full bg-gray-200 p-2"
                  src="/images/save.png"
                  height={50}
                  width={40}
                  alt="save location"
                  title="Save destination"
                />
              )}
              <div className="sr-only ">Save destination</div>
            </button>
          </div>
          <div className="flex-1 w-full flex flex-col  overflow-y-auto bg-white py-[10px] ">
            <div className="my-1 flex items-center bg-white px-4 py-2">
              <Image
                className="mr-2 rounded-full bg-gray-400 p-1"
                alt=""
                height={30}
                width={30}
                src="/images/star.png"
                aria-hidden
              />
              Saved Places
            </div>

            <div className="h-full w-full relative">
              <div className="h-full w-full">
                {placeLoading && (
                  <div className="absolute left-[45px] top-[-15px]">
                    <DotsLoading />
                  </div>
                )}
                {destination.map((item: Destination) => (
                  <SavePlaces
                    key={item._id}
                    id={item._id}
                    pickup={item.pickup}
                    dropoff={item.dropoff}
                    deleteLocationItem={deleteLocationItem}
                    deletePlaceLoading={deletePlaceLoading}
                  />
                ))}
              </div>
            </div>
          </div>
          <Link
            className={`${
              pickup.trim() === "" || dropoff.trim() === ""
                ? "button-disable"
                : "button"
            } text-lg`}
            href={
              pickup.trim() === "" || dropoff.trim() === ""
                ? "#"
                : {
                    pathname: "/confirm",
                    query: {
                      pickup: pickup.trim(),
                      dropoff: dropoff.trim(),
                    },
                  }
            }
            passHref
          >
            Confirm Locations
          </Link>
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

export default Search;
