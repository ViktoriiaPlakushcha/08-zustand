"use client";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useEffect } from "react";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById({ id }),
    refetchOnMount: false,
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  const router = useRouter();
  const close = () => {
    router.back();
  };
  if (isLoading) return <p className={css.loader}>Loading, please wait...</p>;
  if (error || !note) return <p className={css.error}>Something went wrong.</p>;
  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
        </div>
        <button className={css.backBtn} onClick={close}>
          Go Back
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
