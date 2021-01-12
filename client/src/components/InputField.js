import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function InputField({ onChange }) {
  return (
    <div className="InputField">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="search"
        placeholder="Quick search"
        name="quickSearch"
        onChange={onChange}
      />
    </div>
  );
}
