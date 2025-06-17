import { Outlet } from "react-router";
import icon from "../images/icons/Logo_Header.svg";
import { isIphone } from "../functions/isIphone";


const AppLayout = () => {
    if (!isIphone()){
        return <Outlet />    
    }
    return (
    <div className="flex flex-col">
      <div className="fixed left-0 z-[999999999] pb-[9.5px] top-0 h-[95px] w-full bg-[#18222D] gap-[6px] justify-center flex items-end">
        <img  src={icon} alt="headerIcon"/>
      </div>
      <div className="pt-[95px] flex flex-col h-full">
        <Outlet  /> {/* Здесь будут UserProfile или UserPosts */}
      </div>
    </div>
    );
};

export default AppLayout;