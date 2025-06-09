
import { useMemo } from "react";
import nitchTopOneToFifty from "../../../images/Rating/nitche-top1-50.svg";
import nitcheTop1 from "../../../images/Rating/nitche-top1.svg";
import nitcheTop2 from "../../../images/Rating/nitche-top2.svg";
import nitcheTop3 from "../../../images/Rating/nitche-top3.svg";

const useGetNitcheIcon = ({className = "", textClassName, nitchRating }) => {
    const nitchIcon = useMemo(() => {
        if (nitchRating === 1){
            return <img alt="rating-icon" className={className} src={nitcheTop1} /> 
        }
        if (nitchRating === 2){
            return <img alt="rating-icon" className={className} src={nitcheTop2} /> 
        }
        if (nitchRating === 3){
            return <img alt="rating-icon" className={className} src={nitcheTop3} /> 
        }
        if (nitchRating < 51 && nitchRating > 3){
            return (<div className="relative">
                <p className={textClassName}>{nitchRating}</p>
            <img alt="rating-icon" className={className} src={nitchTopOneToFifty} />
            </div>) 
        }
        return null;
    })
    return {nitchIcon};
};

export default useGetNitcheIcon;