import { useMemo } from "react";
import nitcheTopOneToFifty from "../../../images/Rating/common-top1-50.svg";
import common3 from "../../../images/Rating/common-top3.svg";
import common2 from "../../../images/Rating/common-top2.svg";
import common1 from "../../../images/Rating/common-top1.svg";
const useGetCommonIcon = ({className = "", textClassName = "", commonRating }) => {
    const commonIcon = useMemo( () => {
        if (commonRating === 1){
            return <img alt="rating-icon" className={className} src={common1} /> 
        }
        if (commonRating === 2){
            return <img alt="rating-icon" className={className} src={common2} /> 
        }
        if (commonRating === 3){
            return <img alt="rating-icon" className={className} src={common3} /> 
        }
        if (commonRating < 51 && commonRating > 3){
            
            return (<div className="relative">
                <p className={textClassName}>{commonRating}</p>
            <img alt="rating-icon" className={className} src={nitcheTopOneToFifty} />
            </div>) 
        }
        return null;
    }, [commonRating, className, textClassName] )
    return {commonIcon};
};

export default useGetCommonIcon;