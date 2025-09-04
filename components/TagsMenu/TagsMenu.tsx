"use client";
import { useState } from "react";
import css from "./TagsMenu.module.css";
import { NoteTag } from "@/types/note";
import Link from "next/link";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const tags: NoteTag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleToggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem} onClick={handleToggle}>
            <Link
              href={`/notes/filter/All`}
              onClick={handleToggle}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem} onClick={handleToggle}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleToggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
