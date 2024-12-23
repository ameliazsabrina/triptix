import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import React from "react";

function page() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-earth-light bg-auto flex flex-col">
        <div className="flex flex-1 justify-center items-center px-4 flex-col">
          {" "}
          <h1 className="text-3xl font-bold mb-12 text-center mt-12">
            Where do you want to travel?
          </h1>
          <div className="w-full max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
