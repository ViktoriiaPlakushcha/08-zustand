"use client";
import css from "./SearchBox.module.css";
import { useState } from "react";

interface SearchBoxProps {
  updateSearch: (value: string) => void;
}
export default function SearchBox({ updateSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState("");

  const heandelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    updateSearch(val);
  };
  return (
    <input
      name="search"
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={heandelSearch}
    />
  );
}
