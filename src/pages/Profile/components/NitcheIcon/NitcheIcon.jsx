const NitcheIcon = ({nitchRating}) => {
        if (nitchRating === 1){
            return <img alt="rating-icon" className={'rating-icon'} src={'/images/nitche-top1.svg'} /> 
        }
        if (nitchRating === 2){
            return <img alt="rating-icon" className={'rating-icon'} src={"/images/nitche-top2.svg"} /> 
        }
        if (nitchRating === 3){
            return <img alt="rating-icon" className={'rating-icon'} src={"/images/nitche-top3.svg"} /> 
        }
        if (nitchRating < 51 && nitchRating > 3){
            return (<div className="rating-icon">
                <p className={"rating-icon__text"}>{nitchRating}</p>
            <img alt="rating-icon" className={''} src={"/images/nitche-top1-50.svg"} />
            </div>) 
        }
        return null;
};

export default NitcheIcon;