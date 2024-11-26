function Card({ children }) {
  return (
    <div className="rounded-sm border border-gray-600 bg-dark-800 p-5 text-gray-200">
      {children}
    </div>
  );
}

export default Card;
