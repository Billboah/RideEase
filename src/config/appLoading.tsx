import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import ClipLoader from "react-spinners/ClipLoader";
import ContentLoader from "react-content-loader";

const DotsLoading = () => {
  return (
    <ContentLoader
      speed={2}
      width={120}
      height={40}
      viewBox="0 0 120 40"
      backgroundColor="#cccccc"
      foregroundColor="#000000"
    >
      <circle cx="20" cy="4" r="4" />
      <circle cx="35" cy="4" r="4" />
      <circle cx="50" cy="4" r="4" />
    </ContentLoader>
  );
};

function FadeLoading({
  height,
  width,
  margin,
}: {
  height: number;
  width: number;
  margin: number;
}) {
  return (
    <FadeLoader color="#000000" height={height} width={width} margin={margin} />
  );
}

function ClipLoading({ size }: { size: number }) {
  return <ClipLoader color="#000000" size={size} />;
}

export { ClipLoading, FadeLoading, DotsLoading };
