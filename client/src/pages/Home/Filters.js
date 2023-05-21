
const categories = [
  {
    name: "Shirt",
    value: "shirt",
  },
  {
    name: "Trouser",
    value: "trouser",
  },
  {
    name: "Shoe",
    value: "shoe",
  },
  {
    name: "Full Outfit",
    value: "full",
  },
];
const prices = [
  {
    name: "$0-$100",
    value: "0-100",
  },
  {
    name: "$101-$500",
    value: "101-500",
  },
  {
    name: "$500-$1,000",
    value: "500-1000",
  },
  {
    name: "$1001-$10,000",
    value: "1001-10000",
  },
  {
    name: "10,000+",
    value: "10001-100000",
  },
];
function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  
  return (
    <div className="w-72 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-orange-900 text-xl">Filters</h1>
        <i
          className="ri-close-line text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}></i>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text text-gray-600">Categories</h1>

        <div className="flex flex-col gap-1">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>
        <h1 className="text-gray-600 mt-5">Prices</h1>
        <div className="flex flex-col gap-1">
          {prices.map((price) => {
            return (
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="price"
                  className="max-width"
                  checked={filters.price.includes(price.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        price: [...filters.price, price.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        price: filters.price.filter((item) => item !== price.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="price">{price.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
