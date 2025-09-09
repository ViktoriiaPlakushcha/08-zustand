import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found Page",
  description: "This page does not exist",
  openGraph: {
    title: "Not Found Page",
    description: "This page do not exist",
    url: "https://08-zustand-ashy.vercel.app/not-found",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Image",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
