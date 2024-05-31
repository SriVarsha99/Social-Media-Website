import "./SearchResult.css";

export const SearchResult = ({ result, handleSelect }) => {
  return (
    <div
      className="searchResult"
      onClick={(e) => handleSelect(result)}
    >
      {result.name}
    </div>
  );
};