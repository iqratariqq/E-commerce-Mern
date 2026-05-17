
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

import { getAllKitchens } from "../api/kitchenApi";
import KitchenCard from "../Components/KitchenCard";
import Loader from "../Components/Loader";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getkitchens"],
    queryFn: getAllKitchens
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories
  const categories = useMemo(() => {
    if (!data?.kitchens) return [];
    const cats = [...new Set(data.kitchens.map(k => k.category))];
    return cats.filter(Boolean);
  }, [data?.kitchens]);

  // Filter kitchens based on search and category
  const filteredKitchens = useMemo(() => {
    if (!data?.kitchens) return [];

    return data.kitchens.filter((kitchen) => {
      const matchesSearch = kitchen.kitchenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kitchen.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || kitchen.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data?.kitchens, searchTerm, selectedCategory]);

  return (
    <div className="relative w-full mx-auto mt-8 md:mt-16 px-4 md:px-6 pb-12 min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-taupe via-pumpkin_spice to-toupe bg-clip-text text-transparent mb-3">
            Explore Our Kitchen Partners
          </h1>
          <p className="text-taupe text-base md:text-lg opacity-80">
            Discover exceptional food from amazing local kitchens
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-5 mb-10">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-khakhi_beige">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search kitchens by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-3 rounded-lg border-2 border-khakhi_beige bg-off_white text-taupe placeholder-taupe placeholder-opacity-50 focus:outline-none focus:border-pumpkin_spice transition-colors duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-taupe font-semibold text-sm md:text-base">Filter by:</span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === "all"
                  ? "bg-pumpkin_spice text-white shadow-lg"
                  : "bg-khakhi_beige bg-opacity-30 text-taupe hover:bg-opacity-50"
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${selectedCategory === category
                    ? "bg-pumpkin_spice text-white shadow-lg"
                    : "bg-khakhi_beige bg-opacity-30 text-taupe hover:bg-opacity-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-taupe opacity-70">
            Showing {filteredKitchens.length} kitchen{filteredKitchens.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Kitchen Grid */}
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg font-semibold">Error loading kitchens</p>
          </div>
        ) : filteredKitchens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-taupe text-lg opacity-70">No kitchens found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredKitchens.map((kitchen) => (
              <KitchenCard key={kitchen._id} kitchen={kitchen} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
