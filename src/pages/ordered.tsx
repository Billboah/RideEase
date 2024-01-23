import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ComponentLayout } from "./layout";
import axios from "axios";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [orders, setOrders] = useState([]);

  const displayOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/stripe/order`);
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
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[40px] font-bold">My Orders</h1>
        <p className="text-[20px]">
          The uber service car will be here in the next five minutes
        </p>
        <p className="text-blue-500 underline">
          <Link href="/" passHref={true}>
            Visit homepage
          </Link>
          <Link href="/" passHref={true}>
            Visit homepage
          </Link>
        </p>
      </div>
    </ComponentLayout>
  );
};

export default Order;
