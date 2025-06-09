import { useSelector } from "react-redux";

const Feedbacks = () => {
    const userConfig = useSelector( (state) => state.information.baidgeUser );
    console.log(userConfig.feedbacks);
    return (
        <div>
            
        </div>
    );
};

export default Feedbacks;