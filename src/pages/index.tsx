import React from "react";
import Map from "../Components/map";
import Link from "next/link";
import ComponentLayout from "./layout";

export default function Home() {
  return (
    <ComponentLayout pageName="HomePage">
      <div className="h-1/2">
        <Map />
      </div>
      <div className="flex-1 px-4 py-12">
        <div className="flex">
          <button className="lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40">
            <Link
              href="/search"
              passHref={true}
              className="flex h-full w-full flex-col items-center justify-center"
            >
              <img
                className="h-3/5"
                src="https://i.ibb.co/cyvcpfF/uberx.png"
                alt=""
              />
              Ride
            </Link>
          </button>
          <button className="lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40">
            <img
              className="h-3/5"
              src="https://i.ibb.co/n776JLm/bike.png"
              alt=""
            />
            Wheels
          </button>
          <button className="lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40">
            <img
              className="h-3/5"
              src="https://i.ibb.co/5RjchBg/uberschedule.png"
              alt=""
            />
            Reserve
          </button>
        </div>
        <div className="m-1  bg-gray-200 p-1 text-2xl ">
          <p>Where to? </p>
        </div>
      </div>
    </ComponentLayout>
  );
}
