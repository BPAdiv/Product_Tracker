import { useState } from "react";
import { IProductProps } from "../../types";

interface IProps {
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SortProducts({ handleSortChange }: IProps) {
  return (
    <div className="flex mb-10">
      <div>
        <select
          onChange={(e) => handleSortChange(e)}
          id="sort"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="defaute">
            Sort By
          </option>
          <option value="Low">Price Low-High</option>
          <option value="High">Price High-Low</option>
          <option value="Date">Date</option>
          {/* <option value="DE">Germany</option> */}
        </select>
      </div>
      {/* <div>
        <label
          htmlFor="filter"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          multiple
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a filter</option>
          <option value="US">U</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <select data-te-select-init multiple>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
      </select>
      <label data-te-select-label-ref>Example label</label> */}
    </div>
  );
}
