"use client";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 5000);

  return (
    <>
      {loader && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] w-full h-full flex items-center justify-center z-[99999]">
          <ClipLoader
            color="#0e0a5f"
            size={60}
            cssOverride={{ borderWidth: "10px" }}
          />
        </div>
      )}
    </>
  );
};

export default Loader;
