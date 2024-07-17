export const SearchBar = ({
  setFilterWord,
}: {
  setFilterWord: (word: string) => void;
}) => {
  function submitSearch(e) {
    e.preventDefault();
    setFilterWord(e.target[0].value);
  }
  return (
    <>
      <form onSubmit={(e) => submitSearch(e)}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="w-4 h-4 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="p-4 ps-10 text-sm rounded-lg text-black"
            placeholder="Search location"
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-gray-800 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};
