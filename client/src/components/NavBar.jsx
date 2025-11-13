import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/" className="text-xl font-semibold">
          📝 BlogApp
        </Link>
        <div className="space-x-4">
          <Link to="/">Posts</Link>
          <Link to="/create" className="bg-white text-blue-600 px-3 py-1 rounded-md font-medium">
            + New Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
