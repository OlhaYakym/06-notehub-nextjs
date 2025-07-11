"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Note.client.module.css";

type Props = {
  initialData: Awaited<ReturnType<typeof fetchNotes>>;
};

export default function NotesClient({ initialData }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, debouncedQuery],
    queryFn: () => fetchNotes({ search: debouncedQuery, page: currentPage }),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && debouncedQuery === "" ? initialData : undefined,
  });
  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };
  const notes = data?.notes;
  const totalPages = data?.totalPages;
  const togleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onSearch={handleSearch}
          // setPage={setCurrentPage}
        />
        {totalPages && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={togleModal}>
          Create note +
        </button>
      </header>
      {notes && <NoteList notes={notes} />}
      {isModalOpen && <NoteModal onClose={togleModal} />}
    </div>
  );
}
