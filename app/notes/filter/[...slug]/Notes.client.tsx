"use client";
import { useState, useEffect } from "react";
import css from "./NotesPage.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag;
}

function NotesClient({ tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isError } = useQuery({
    queryKey: ["notes", searchQuery, tag ?? null, currentPage],
    queryFn: () => fetchNotes({ query: searchQuery, tag, currentPage }),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);
  useEffect(() => {
    if (data?.totalPages && currentPage > data.totalPages) {
      setCurrentPage(Math.max(1, data.totalPages));
    }
  }, [data?.totalPages, currentPage]);
  useEffect(() => {
    setSearchQuery("");
  }, [tag]);

  useEffect(() => {
    if (searchQuery.length > 0 && data?.notes.length === 0) {
      console.log("No notes match your search.");
    }
  }, [data, searchQuery]);
  useEffect(() => {
    if (isError) {
      console.log("Oops, something went wrong! Try again later.", "error");
    }
  }, [isError]);

  const handleOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox updateSearch={updateSearchQuery} />}
          {data && data.totalPages > 1 && (
            <Pagination
              page={currentPage}
              totalPage={data.totalPages}
              onChange={setCurrentPage}
            />
          )}
          {
            <button className={css.button} onClick={handleOpen}>
              Create note +
            </button>
          }
        </header>

        <NoteList notes={data?.notes ?? []} />
        {isModalOpen && (
          <Modal onClose={handleClose}>
            <NoteForm onClose={handleClose} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default NotesClient;
