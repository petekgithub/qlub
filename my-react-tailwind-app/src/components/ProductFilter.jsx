import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductFilter = ({ onFilter }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("");
  const [rateFilter, setRateFilter] = useState("");
  const [sortAvailability, setSortAvailability] = useState("");

  const handlePriceChange = (e) => {
    const selectedSort = e.target.value;
    setSortType(selectedSort);
    onFilter.handlePriceFilter(selectedSort);

    //  filter should be added to query string
    navigate(`?price=${selectedSort}`);
  };

  const handleRateChange = (e) => {
    const selectedRate = e.target.value;
    setRateFilter(selectedRate);
    onFilter.handleRateFilter(selectedRate);

    //  filter should be added to query string
    navigate(`?rate=${selectedRate}`);
  };

  const handleAvailabilityChange = (e) => {
    const selectedAvailability = e.target.value;
    setSortAvailability(selectedAvailability);
    onFilter.handleAvailabilityFilter(selectedAvailability);

    //  filter should be added to query string
    navigate(`?availability=${selectedAvailability}`);
  };

  return (
    <div className="mb-10 flex">
      <div className="mt-10 mb-15">
        {" "}
        <span className="font-bold text-sky-300">Price: &nbsp;</span>
        <select
          className="form-select form-select-sm"
          name="price"
          id="price"
          value={sortType}
          onChange={handlePriceChange}
        >
          <option value="">Sort By Price</option>
          <option value="LowToHigh">Low To High</option>
          <option value="HighToLow">High To Low</option>
        </select>
      </div>

      <div className="mt-10 ml-20 mb-15">
        <span className="font-bold text-sky-300">Rate: &nbsp;</span>
        <select
          className="form-select form-select-sm"
          name="rate"
          id="rate"
          value={rateFilter}
          onChange={handleRateChange}
        >
          <option value="">Filter By Rate</option>
          <option value="highest">Highest Rate</option>
          <option value="lowest">Lowest Rate</option>
        </select>
      </div>

      <div className="mt-10 ml-20 mb-15">
        <span className="font-bold text-sky-300">Availability: &nbsp;</span>
        <select
          className="form-select form-select-sm"
          name="availability"
          id="availability"
          value={sortAvailability}
          onChange={handleAvailabilityChange}
        >
          <option value="">Filter By Availability</option>
          <option value="in_stock">In Stock</option>
          <option value="sold_out">Sold Out</option>
          <option value="new_arrival">New Arrival</option>
          <option value="last_items">Last Items</option>
        </select>
      </div>
    </div>
  );
};

ProductFilter.propTypes = {
  onFilter: PropTypes.shape({
    handlePriceFilter: PropTypes.func.isRequired,
    handleRateFilter: PropTypes.func.isRequired,
    handleAvailabilityFilter: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProductFilter;
