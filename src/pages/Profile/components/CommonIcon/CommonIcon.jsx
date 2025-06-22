const CommonIcon = ({commonRating}) => {
        if (commonRating === 1){
            return <img alt="rating-icon" className={'rating-icon'} src={"/images/common-top1.svg"} /> 
        }
        if (commonRating === 2){
            return <img alt="rating-icon" className={'rating-icon'} src={"/images/common-top2.svg"} /> 
        }
        if (commonRating === 3){
            return <img alt="rating-icon" className={'rating-icon'} src={"/images/common-top3.svg"} /> 
        }
        if (commonRating < 51 && commonRating > 3){
            
            return (<div className="rating-icon">
                <p className={"rating-icon__text"}>{commonRating}</p>
            <img alt="rating-icon" className={''} src={"/images/common-top1-50.svg"} />
            </div>) 
        }
        return null;
};

export default CommonIcon;