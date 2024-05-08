import { Button } from "antd";
import { memo, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterMenu = memo(({ categories, handleRerender }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtered, setFilterd] = useState("");

  const handleFilter = useCallback(
    (categoryId) => {
      if (!filtered || filtered !== categoryId) {
        searchParams.set("filter", categoryId);
      } else {
        searchParams.delete("filter");
        setFilterd("");
      }
      setSearchParams(searchParams);
      handleRerender();
    },
    [filtered, handleRerender, searchParams, setSearchParams]
  );

  return (
    <>
      {categories &&
        categories.map((v) => {
          const classNameVar = v._id === filtered ? "filtered" : "";
          return (
            <Button
              className={"filter-tag " + classNameVar}
              onClick={() => {
                setFilterd(v._id);
                handleFilter(v._id);
              }}
            >
              {v.name}
            </Button>
          );
        })}
    </>
  );
});

export default FilterMenu;
