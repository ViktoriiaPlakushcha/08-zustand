import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const first = slug?.[0];
  const tag: NoteTag | undefined =
    first && first !== "All" ? (first as NoteTag) : undefined;
  const title = tag ? `Notes with tag: ${tag}` : "All notes";
  const description = tag ? `Notes filtered by tag ${tag}` : "All notes list";
  const url = tag
    ? `https://08-zustand-ashy.vercel.app/notes/filter/${tag}`
    : "https://08-zustand-ashy.vercel.app/notes/filter/All";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
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
}

const NotesPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const first = slug?.[0];
  const tag: NoteTag | undefined =
    first && first !== "All" ? (first as NoteTag) : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", tag ?? null, 1],
    queryFn: () => fetchNotes({ query: "", tag, currentPage: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? "All"} tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
