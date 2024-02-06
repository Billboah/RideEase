/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useEffect, useState } from "react";
import { setCarType, setCarDuration } from "../state/features/locationSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCarType } from "../state/features/locationSlice";
import { FadeLoading } from "@/config/appLoading";
import { Car } from "../../types";

const CarType = ({
  car,
  pickupCoordinates,
  dropoffCoordinates,
}: {
  car: Car;
  pickupCoordinates: number[];
  dropoffCoordinates: number[];
}) => {
  const selectedCar: string = useSelector(selectCarType);
  const [rideDuration, setRideDuration] = useState(0);
  const [loadingDuration, setLoadingDuration] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const SelectACar = async () => {
    if (rideDuration) {
      dispatch(setCarType(car.service));
      dispatch(setCarDuration(rideDuration));
    }
  };

  useEffect(() => {
    async function getride() {
      setLoadingDuration(true);
      try {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiYmlsbGJvYWgiLCJhIjoiY2xwYWU3ZGUzMDYydzJpcmw4c3hvcHdteSJ9.R0hd7u_Uuh-n-euSJTXo-w`
        );
        const data = await res.json();
        let duration = data.routes[0].duration;
        setRideDuration(duration / 100);
        setLoadingDuration(false);
      } catch (error: any) {
        if (error.response) {
          setApiError(error.response.data.error);
          setLoadingDuration(false);
        } else if (error.request) {
          alert(
            "Cannot reach the server. Please check your internet connection."
          );
          setLoadingDuration(false);
        } else {
          setLoadingDuration(false);
        }
      }
    }
    getride();
  }, [router, dropoffCoordinates, pickupCoordinates]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setApiError("");
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiError]);

  return (
    <>
      <button
        className={`flex w-full h-[80px] justify-between items-center p-4 hover:bg-gray-100 active:bg-white ${
          selectedCar === car.service ? "bg-gray-100" : "bg-white"
        }`}
        disabled={loadingDuration}
        onClick={SelectACar}
      >
        <div className="flex items-center justify-start">
          <img
            className="mr-4 h-[55px] w-auto "
            src={car.imgUrl}
            alt={`${car.service} image`}
          />
          <div className="flex flex-1 flex-col items-start">
            <div className="font-medium">{car.service}</div>
            <div className="text-xs text-blue-500">5 min away</div>
          </div>
        </div>
        {loadingDuration ? (
          <div className="pt-[20px]">
            {" "}
            <FadeLoading height={5} width={3} margin={-12} />
          </div>
        ) : (
          <div className="text-sm">
            {"$" + (rideDuration * car.multiplier).toFixed(2)}
          </div>
        )}
      </button>
      <div
        className={`${
          !apiError ? "hidden" : "animate__fadeInUp"
        } animate__animated animate__delay-300ms absolute  bottom-[20px] flex h-fit w-full items-center justify-center p-[10px] `}
      >
        <div className="flex h-fit w-full max-w-[500px] items-center justify-center rounded border border-inherit bg-red-500 px-1 py-2 text-white shadow-lg">
          <p className="text-center font-semibold">{apiError}</p>
        </div>
      </div>
    </>
  );
};

export default CarType;
