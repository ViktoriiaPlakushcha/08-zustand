"use client";
import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  page: number;
  totalPage: number;
  onChange: (selected: number) => void;
}

export default function Pagination({
  page,
  totalPage,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPage}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
