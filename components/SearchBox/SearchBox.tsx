import css from "./SearchBox.module.css";
interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
  // setPage: (page: number) => void;
}
export default function SearchBox({
  value,
  onSearch,
}: // setPage,
SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    // setPage(1);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  );
}
