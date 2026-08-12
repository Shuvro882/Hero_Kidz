import React from "react";

const loading = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Image Skeleton */}
        <div className="bg-base-200 rounded-xl p-6">
          <div className="skeleton w-full h-[450px] rounded-xl"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-5">

          <div className="skeleton h-10 w-3/4"></div>

          <div className="skeleton h-5 w-1/2"></div>

          <div className="flex gap-3">
            <div className="skeleton h-5 w-20"></div>
            <div className="skeleton h-5 w-20"></div>
            <div className="skeleton h-5 w-20"></div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="skeleton h-10 w-40"></div>
            <div className="skeleton h-7 w-24"></div>
            <div className="skeleton h-7 w-16"></div>
          </div>

          <div className="space-y-2">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-11/12"></div>
            <div className="skeleton h-4 w-10/12"></div>
            <div className="skeleton h-4 w-9/12"></div>
          </div>

          <div className="divider"></div>

          <div className="skeleton h-7 w-40"></div>

          <div className="space-y-3">
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-11/12"></div>
            <div className="skeleton h-5 w-10/12"></div>
            <div className="skeleton h-5 w-9/12"></div>
          </div>

          <div className="flex gap-4 mt-8">
            <div className="skeleton h-12 flex-1"></div>
            <div className="skeleton h-12 flex-1"></div>
          </div>

        </div>

      </div>

      {/* FAQ Skeleton */}
      <div className="mt-16">

        <div className="skeleton h-9 w-72 mb-6"></div>

        <div className="space-y-3">
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
        </div>

      </div>

    </section>
  );
};

export default loading;