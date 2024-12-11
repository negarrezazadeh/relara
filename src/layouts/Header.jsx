import { Input } from "@/components/ui/input";
import { FaBell } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { useAuth } from "@/context/AuthContextProvider";
import { DropDown } from "@/ui/DropDown";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const { user } = useAuth();

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="flex justify-between border-b border-gray-600 bg-dark-800 px-5 py-5 lg:px-10">
        <div className="hidden text-2xl font-extrabold text-white lg:block">
          Relara LOGO
        </div>
        <div className="hidden w-96 lg:block">
          <Input type="text" placeholder="Search" />
        </div>
        <button
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <HiMenuAlt1 className="text-3xl text-gray-400" />
        </button>
        <div className="flex items-center space-x-5 lg:space-x-7">
          <button>
            <FaBell className="text-xl text-gray-400" />
          </button>
          <button>
            <IoSunnyOutline className="text-2xl text-gray-400" />
          </button>
          <DropDown>
            <p
              variant="outline"
              className="cursor-pointer text-base font-semibold text-violet-400"
            >
              Hello {user.name}!
            </p>
          </DropDown>
        </div>
      </div>
    </header>
  );
}

export default Header;
