import { Input } from "@/components/ui/input";
import { FaBell } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";

function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="flex justify-between border-b border-gray-600 bg-dark-800 px-10 py-5">
        <div className="text-2xl font-extrabold text-white">Relara LOGO</div>
        <div className="w-96">
          <Input type="text" placeholder="Search" />
        </div>
        <div className="flex items-center space-x-7">
          <button>
            <BsFillPersonFill className="text-2xl text-gray-400" />
          </button>
          <button>
            <FaBell className="text-xl text-gray-400" />
          </button>
          <button>
            <IoSunnyOutline className="text-2xl text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
