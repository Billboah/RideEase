/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ComponentLayout from "./layout";
import { useRouter } from "next/router";
import Map from "../Components/map";

interface CarData {
  metadata: {
    car_images: string;
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
        try {
          const response = await fetch(`/api/stripe/${sessionId}`);
          const data = await response.json();
          setSuccessData(data);
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
      }
    };

    fetchSuccessData();
  }, [sessionId]);

  const carImage =
    successData.metadata && JSON.parse(successData.metadata.car_images)[0];

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
          <div>
            {carImage && (
              <img src={carImage} alt="" className="w-[150px] w-auto" />
            )}
          </div>
          <div className="flex justify-center items-center">
            <Link href="/" passHref={true} className="button w-[120px] m-1">
              Home
            </Link>
            <Link
              href="/orders"
              passHref={true}
              className="button w-[120px] m-1"
            >
              My History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
