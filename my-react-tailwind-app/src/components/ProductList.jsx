// YOU CAN TRY WITH PART1 OR PART2. BOTH ARE WORKS WELL.

/**
 * PART 1: 

import { useState } from "react";
import ProductFilter from "./ProductFilter";
import productsData from "../constants/productDatas";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState([...productsData]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (searchInput) => {
    setSearchInput(searchInput);

    const formattedQuery = searchInput.toString().toLowerCase();

    const filtered = productsData.filter((product) =>
      product.title.toLowerCase().includes(formattedQuery)
    );

    setFilteredProducts(filtered);
  };

  const handlePriceFilter = (sortType) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortType === "LowToHigh") {
        return a.price - b.price;
      } else if (sortType === "HighToLow") {
        return b.price - a.price;
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  const handleRateFilter = (rateFilter) => {
    if (rateFilter === "highest") {
      const highestRated = [...filteredProducts].sort(
        (a, b) => b.rate - a.rate
      );
      setFilteredProducts(highestRated);
    } else if (rateFilter === "lowest") {
      const lowestRated = [...filteredProducts].sort((a, b) => a.rate - b.rate);
      setFilteredProducts(lowestRated);
    }
  };

  const handleAvailabilityFilter = (sortAvailability) => {
    if (sortAvailability === "in_stock") {
      const inStockProducts = productsData.filter(
        (product) => product.availability === "in_stock"
      );
      setFilteredProducts(inStockProducts);
    } else if (sortAvailability === "sold_out") {
      const soldOutProducts = productsData.filter(
        (product) => product.availability === "sold_out"
      );
      setFilteredProducts(soldOutProducts);
    } else if (sortAvailability === "new_arrival") {
      const newArrivalProducts = productsData.filter(
        (product) => product.availability === "new_arrival"
      );
      setFilteredProducts(newArrivalProducts);
    } else if (sortAvailability === "last_items") {
      const lastItemsProducts = productsData.filter(
        (product) => product.availability === "last_items"
      );
      setFilteredProducts(lastItemsProducts);
    }
  };

  const resetFilters = () => {
    setFilteredProducts([...productsData]);
    setSearchInput("");
  };

  return (
    <div className="container mx-auto p-4 mt-30">
      <div className="flex justify-between mb-4 mt-4">
        <div className="flex items-center w-50 justify-center">
          <input
            type="text"
            placeholder="Search Product Title"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button
            onClick={resetFilters}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      <ProductFilter
        onFilter={{
          handlePriceFilter,
          handleRateFilter,
          handleAvailabilityFilter,
        }}
      />

      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-4 rounded shadow cursor-pointer hover:bg-lime-100 transition"
          >
            <div className="text-center">
              <img
                className="mx-auto mb-4 object-cover h-60 w-full aspect-w-16 aspect-h-9"
                src={product.photo}
                alt="thumbnail"
              />
              <div className="mb-2">
                <h3 className="text-xl font-bold font-weight: 500 text-blue-500">
                  {product.title}
                </h3>
                <p>{product.availability}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-green-500">
                  ${product.price}
                </p>
                <span className="text-gray-500">{product.rate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
 * 
 * 
 */

// PART 2:
//**  use useMemo to store computationally expensive values, especially in filtering operations. */

import { useState, useMemo } from "react";
import ProductFilter from "./ProductFilter";
import productsData from "../constants/productDatas";

const ProductList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [sortType, setSortType] = useState("");
  const [rateFilter, setRateFilter] = useState("");
  const [sortAvailability, setSortAvailability] = useState("");

  /**
   *using useMemo with dependencies productsData, searchInput, sortType, rateFilter, sortAvailability
    We store the filteredProducts value.
   *
  */
  const filteredProducts = useMemo(() => {
    const formattedQuery = searchInput.toString().toLowerCase();

    return productsData
      .filter((product) => product.title.toLowerCase().includes(formattedQuery))
      .sort((a, b) => {
        if (sortType === "LowToHigh") {
          return a.price - b.price;
        } else if (sortType === "HighToLow") {
          return b.price - a.price;
        }
        return 0;
      })
      .filter((product) => {
        if (rateFilter === "highest") {
          return product.rate === Math.max(...productsData.map((p) => p.rate));
        } else if (rateFilter === "lowest") {
          return product.rate === Math.min(...productsData.map((p) => p.rate));
        }
        return true;
      })
      .filter((product) => {
        if (sortAvailability === "in_stock") {
          return product.availability === "in_stock";
        } else if (sortAvailability === "sold_out") {
          return product.availability === "sold_out";
        } else if (sortAvailability === "new_arrival") {
          return product.availability === "new_arrival";
        } else if (sortAvailability === "last_items") {
          return product.availability === "last_items";
        }
        return true;
      });
  }, [productsData, searchInput, sortType, rateFilter, sortAvailability]);

  const handleSearch = (searchInput) => {
    setSearchInput(searchInput);
  };

  const handlePriceFilter = (sortType) => {
    setSortType(sortType);
  };

  const handleRateFilter = (rateFilter) => {
    setRateFilter(rateFilter);
  };

  const handleAvailabilityFilter = (sortAvailability) => {
    setSortAvailability(sortAvailability);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSortType("");
    setRateFilter("");
    setSortAvailability("");
  };

  return (
    <div className="container mx-auto p-4 mt-30">
      <div className="flex justify-between mb-4 mt-4">
        <div className="flex items-center w-50 justify-center">
          <input
            type="text"
            placeholder="Search Product Title"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button
            onClick={resetFilters}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Call ProductFilter component */}
      <ProductFilter
        onFilter={{
          handlePriceFilter,
          handleRateFilter,
          handleAvailabilityFilter,
        }}
      />

      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-4 rounded shadow cursor-pointer hover:bg-lime-100 transition"
          >
            <div className="text-center">
              <img
                className="mx-auto mb-4 object-cover h-60 w-full aspect-w-16 aspect-h-9"
                src={product.photo}
                alt="thumbnail"
              />
              <div className="mb-2">
                <h3 className="text-xl font-bold font-weight: 500 text-blue-500">
                  {product.title}
                </h3>
                <p>{product.availability}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-green-500">
                  ${product.price}
                </p>
                <span className="text-gray-500">{product.rate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
