/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ComponentLayout from "./layout";
import { useRouter } from "next/router";
import Map from "../components/map";
import { ClipLoading } from "@/config/appLoading";

interface CarData {
  metadata: {
    car_images: string;
    uber_type: string;
  };
}

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [successData, setSuccessData] = useState<Partial<CarData> | CarData>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const sessionId = session_id;

  useEffect(() => {
    const fetchSuccessData = async () => {
      if (sessionId) {
        setLoading(true);
        try {
          const response = await fetch(`/api/stripe/${sessionId}`);
          const data = await response.json();
          setSuccessData(data);
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          if (error.response) {
            setLoading(false);
            setApiError(error.response.data.error);
          } else if (error.request) {
            setLoading(false);
            alert(
              "Cannot reach the server. Please check your internet connection."
            );
          } else {
            setLoading(false);
            console.error("Error:", error.message);
          }
        }
      }
    };

    fetchSuccessData();
  }, [sessionId]);

  const carImage =
    successData.metadata && JSON.parse(successData.metadata.car_images)[0];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setApiError("");
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiError]);

  return (
    <div className="relative">
      <div>
        <div className="h-screen ">
          <Map />
        </div>
      </div>
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 h-screen w-full flex justify-center items-center shadow-md">
        <div className="flex flex-col items-center justify-center  bg-white rounded-md p-[10px] sm:p-[20px]">
          <h1 className="text-[25px] text-center font-bold">
            Booking successful!
          </h1>
          <p className="">Booking has been confirm</p>
          <p className="">Driver will pick you up in 5 minutes</p>
          {loading ? (
            <ClipLoading size={40} />
          ) : (
            <div>
              {carImage && (
                <img src={carImage} alt="" className="w-[150px] w-auto" />
              )}
              {successData.metadata && (
                <p className="text-gray-400 font-bold">
                  {successData.metadata.uber_type}
                </p>
              )}
            </div>
          )}
          <div className="flex justify-center items-center">
            <Link href="/" passHref={true} className="button w-[120px] m-1">
              Home
            </Link>
            <Link
              href="/histories"
              passHref={true}
              className="button w-[120px] m-1"
            >
              My History
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          !apiError ? "hidden" : "animate__fadeInUp"
        } animate__animated animate__delay-300ms absolute  bottom-[20px] flex h-fit w-full items-center justify-center p-[10px] `}
      >
        <div className="flex h-fit w-full max-w-[500px] items-center justify-center rounded border border-inherit bg-red-500 px-1 py-2 text-white shadow-lg">
          <p className="text-center font-semibold">{apiError}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
