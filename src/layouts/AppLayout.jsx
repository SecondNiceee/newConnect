import { Outlet } from "react-router";
import icon from "../images/icons/connectHeader.svg";


const AppLayout = () => {
    return (
    <div className="flex flex-col">
      <div className="mt-[14.33px] mb-[15px] gap-[6px] justify-center flex items-center">
        <img className="w-[24px] h-[24px]" src={icon} alt="headerIcon"/>
        <h1 className="text-white text-[20px] font-sf-pro-display-600 leading-[24.726px] tracking-[0.411px]">Connect</h1>
      </div>
      <Outlet /> {/* Здесь будут UserProfile или UserPosts */}
    </div>
    );
};

export default AppLayout;