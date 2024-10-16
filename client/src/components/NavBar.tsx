import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

const NavBar: React.FC<NavBarProps> = ({ brandName, imageSrcPath, navItems }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <nav className="bg-background shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center">
          <img src={imageSrcPath} alt={brandName} className="h-12 w-12" />
          <span className="ml-3 text-primary text-2xl font-bold">{brandName}</span>
        </Link>

        {/* Nav Items and Search Bar */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setSelectedIndex(index)}
              className={`text-lg ${
                selectedIndex === index ? "text-primary font-semibold" : "text-foreground"
              } hover:text-secondary transition`}
            >
              {item}
            </Link>
          ))}
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-muted p-2 rounded-lg text-foreground border border-border placeholder-secondary focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 text-primary">
              <HiMagnifyingGlass className="text-xl" />
            </button>
          </form>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-primary focus:outline-none"
          aria-label="Toggle Menu"
          onClick={() => setSelectedIndex(selectedIndex === -1 ? -2 : -1)}
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {selectedIndex === -2 && (
        <div className="md:hidden bg-background px-6 pt-2 pb-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setSelectedIndex(index)}
              className={`block text-lg ${
                selectedIndex === index ? "text-primary font-semibold" : "text-foreground"
              } hover:text-secondary transition`}
            >
              {item}
            </Link>
          ))}

          {/* Search Bar in Mobile Menu */}
          <form onSubmit={handleSearch} className="mt-4 relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-muted p-2 rounded-lg text-foreground border border-border placeholder-secondary focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 text-primary">
              <HiMagnifyingGlass className="text-xl" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
