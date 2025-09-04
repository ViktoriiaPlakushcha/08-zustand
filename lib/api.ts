import { type Note, type NoteTag, type NewNote } from "../types/note";
import axios from "axios";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

interface FetchNotesProps {
    query?: string,
    tag?: NoteTag,
    currentPage: number,
    perPage?: number,
    
}

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number,
}

interface FetchNoteByIdProps {
    id: string;
}


async function fetchNotes({ query, currentPage, tag }: FetchNotesProps): Promise<FetchNotesResponse> {
    const params: {
    search?: string;
    tag?: NoteTag;
    page: number;
    perPage: number;
  } = {
    page: currentPage,
    perPage: 12,
    };
    
    if (query && query.trim()) params.search = query.trim();
    if (tag) params.tag = tag;


    const response = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', {
        params,
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return response.data;
}

async function deleteNote(id: string): Promise<Note> {
    const deleteResponse = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return deleteResponse.data;
}

async function createNote(newNote: NewNote): Promise<Note> {
    const createResponse = await axios.post<Note>('https://notehub-public.goit.study/api/notes', newNote, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
    return createResponse.data;
}

async function fetchNoteById({ id }: FetchNoteByIdProps): Promise<Note> {
    const resp = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return resp.data;
}

export { fetchNotes, deleteNote, createNote, fetchNoteById};