import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ComponentLayout } from "./layout";
import axios from "axios";
import Map from "../Components/map";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [orders, setOrders] = useState([]);

  const displayOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/stripe/orders`);
      setOrders(data);
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
    displayOrders();
  }, []);

  console.log(orders);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setApiError("");
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiError]);

  console.log(orders);

  return (
    <ComponentLayout>
      <div className="h-screen min-h-fit bg-gray-200">
        <nav className="bg-black p-4">
          <Link href="/" passHref>
            <img
              className="h-5 cursor-pointer"
              src="https://companieslogo.com/img/orig/UBER.D-f23d4b1c.png?t=1635007057"
              alt="back button"
              title="Home"
            />
          </Link>
        </nav>
        <div className="relative h-[93vh]">
          <div className="h-1/3 md:h-full">
            <Map />
          </div>
          <div className="bg-white flex h-2/3  flex-col rounded-md md:absolute md:left-0 md:top-0 md:h-[85vh] md:w-1/2 "></div>
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
