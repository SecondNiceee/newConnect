import { Outlet } from "react-router";
import icon from "../images/icons/Logo_Header.svg";


const AppLayout = () => {
    return (
    <div className="flex flex-col">
      <div className="fixed z-[999999999] pb-[10px] top-0 h-[95px] w-full bg-[#18222D] gap-[6px] justify-center flex items-end">
        <img  src={icon} alt="headerIcon"/>
      </div>
      <div className="pt-[95px]">
        <Outlet  /> {/* Здесь будут UserProfile или UserPosts */}
      </div>
    </div>
    );
};

export default AppLayout;