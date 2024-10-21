import React, { useState } from "react";
import { Menu, Search, Home, PlusSquare, Eye, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Home, label: "Dashboard", id: "Home", to: "/" },
    { icon: PlusSquare, label: "Add Course", id: "Add", to: "/add-course" },
    { icon: Eye, label: "View Course", id: "View", to: "/admin-view-course" },
  ];

  return (
    <div
      className={cn(
        "flex-shrink-0 h-full bg-gray-800 text-gray-100 transition-all duration-300 ease-in-out border-r border-white-100",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Top section */}
        <div className="flex flex-col space-y-6 p-4">
          <button onClick={toggleSidebar} className="self-start text-4xl">
            <Menu className="h-8 w-8" />
          </button>
          <div
            className={cn(
              "flex items-center",
              isOpen ? "w-full" : "justify-center"
            )}
          >
            {isOpen ? (
              <div className="flex w-full items-center rounded-md bg-gray-700 px-3 py-2">
                <Search className="mr-2 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
            ) : (
              <Search className="h-6 w-6" />
            )}
          </div>
        </div>

        <div className="my-2 border-t border-gray-500 " />

        {/* Menu items */}
        <nav className="flex-grow space-y-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "group relative flex w-full items-center rounded-md px-2 py-2 transition-colors duration-200",
                activeItem === item.id
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700"
              )}
            >
              <item.icon className="h-6 w-8" />
              {isOpen && (
                <span className="ml-3 whitespace-nowrap">{item.label}</span>
              )}

              {/* Tooltip for hover effect when sidebar is collapsed */}
              {!isOpen && (
                <span className="absolute left-12 bg-gray-700 text-gray-100 rounded-md px-2 py-1 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto p-4">
          <Link
            to="/profile"
            onClick={() => setActiveItem("Settings")}
            className="group relative flex w-full items-center rounded-md px-2 py-2 hover:bg-gray-700"
          >
            <Settings className="h-6 w-6" />
            {isOpen && <span className="ml-3 whitespace-nowrap">Settings</span>}

            {/* Tooltip for settings when sidebar is collapsed */}
            {!isOpen && (
              <span className="absolute left-12 bg-gray-700 text-gray-100 rounded-md px-2 py-1 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Settings
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
