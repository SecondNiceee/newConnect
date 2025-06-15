import { Outlet } from "react-router";
import icon from "../images/icons/connectHeader.svg";


const AppLayout = () => {
    return (
    <div className="flex flex-col">
      <div className="fixed z-[999999999] top-0 h-[80px] w-full bg-black gap-[6px] justify-center flex items-center">
        <img className="w-[24px] h-[24px]" src={icon} alt="headerIcon"/>
        <h1 className="text-white text-[20px] font-sf-pro-display-600 leading-[24.726px] tracking-[0.411px]">Connect</h1>
      </div>
      <div className="pt-[100px]">
        <Outlet  /> {/* Здесь будут UserProfile или UserPosts */}
      </div>
    </div>
    );
};

export default AppLayout;