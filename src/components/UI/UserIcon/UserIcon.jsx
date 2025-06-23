import useGetUserPhotoLink from "../../../hooks/useGetUserPhotoLink";
import IconLeaves from "../IconLeaves/IconLeaves";

const UserIcon = ({user, small}) => {
    const link = useGetUserPhotoLink({anotherUserInfo : user});
    return (
        <div className="relative">
            <IconLeaves small = {small} user={user} className={"absolute left-1/2 -translate-x-1/2"} />
            <img alt="icon" src={link} className="w-[40px] h-[40px] rounded-full" />
        </div>
    );
};

export default UserIcon;