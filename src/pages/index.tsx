import React from "react";
import Map from "../components/map";
import Link from "next/link";
import ComponentLayout from "./layout";
import Image from "next/image";

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
              <Image src="/images/uberX.png" alt="" height={50} width={80} />
              Ride
            </Link>
          </button>
          <button className="lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40">
            <Image src="/images/bike.png" alt="" height={50} width={80} />
            Wheels
          </button>
          <button className="lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40">
            <Image
              src="/images/uberschedule.png"
              alt=""
              height={50}
              width={80}
            />
            Reserve
          </button>
        </div>
        <div className="mt-3 mx-2 text-gray-400 text-2xl font-bold ">
          <p>Always the ride you want </p>
        </div>
      </div>
    </ComponentLayout>
  );
}
