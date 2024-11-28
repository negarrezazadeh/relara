function Loader() {
  return (
    <div className="fixed inset-0 z-50 h-screen flex items-center justify-center bg-black/40">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-transparent"></div>
    </div>
  );
}

export default Loader;
