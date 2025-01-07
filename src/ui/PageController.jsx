function PageController({
  currentPage,
  lastPage,
  isPlaceholderData,
  onPageChange,
}) {
  return (
    <div className="mt-4 flex items-center justify-end">
      <button
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`text-sm font-medium ${currentPage === 1 ? "text-gray-500" : "text-violet-500"}`}
      >
        Previous
      </button>
      <span className="mx-4 text-gray-600">|</span>
      <span className="text-sm font-medium text-gray-300">
        {currentPage} of {lastPage}
      </span>
      <span className="mx-4 text-gray-600">|</span>

      <button
        onClick={() => onPageChange((prev) => Math.min(prev + 1, lastPage))}
        disabled={currentPage === lastPage || isPlaceholderData}
        className={`text-sm font-medium ${currentPage === lastPage || isPlaceholderData ? "text-gray-500" : "text-violet-500"}`}
      >
        Next
      </button>
    </div>
  );
}

export default PageController;
