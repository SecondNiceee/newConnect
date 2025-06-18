class MenuController{
    hideMenu(){
        setTimeout( () => {
            document.documentElement.querySelector(".FirstMenu").style.display = "none"
        }, 0 )
    }
    showMenu(){
        setTimeout( () => {
            document.documentElement.querySelector(".FirstMenu").style.display = "flex"
        }, 0 )
    }
    lowerMenu(){
        if (document.documentElement.querySelector(".FirstMenu")){
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").classList.add("disappearAnimation")
                document.documentElement.querySelector(".FirstMenu").classList.remove("appearAnimation")
            }, 0 )
        }
        setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").classList.add("disappearAnimation")
                document.documentElement.querySelector(".FirstMenu").classList.remove("appearAnimation")
            }, 100 )
    }
    raiseMenu(){
        setTimeout( () => {
            document.documentElement.querySelector(".FirstMenu").classList.add("appearAnimation")
            document.documentElement.querySelector(".FirstMenu").classList.remove("disappearAnimation")
        }, 0 )
    }
}

const menuController = new MenuController();
export default menuController;