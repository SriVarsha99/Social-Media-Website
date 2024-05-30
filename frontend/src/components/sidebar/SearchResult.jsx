import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="searchResult"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};