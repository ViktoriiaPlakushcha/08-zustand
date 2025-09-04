import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

const NotesPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const first = slug?.[0];
  const tag: NoteTag | undefined =
    first && first !== "All" ? (first as NoteTag) : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", tag, 1],
    queryFn: () => fetchNotes({ query: "", tag, currentPage: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? "All"} tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
