import { useEffect } from "react";


const useBlockInputs = () => {
  useEffect(() => {
      const menu = document.documentElement.querySelector(".FirstMenu");
        const input = document.querySelectorAll('input'); 
        const textarea = document.querySelectorAll("textarea");
        for (let smallInput of input) {
          smallInput.addEventListener("focus", () => {
            menu.style.display = "none"; // скрываем меню
          });
          smallInput.addEventListener("blur", () => {
            menu.style.display = "flex"; // скрываем меню
          });
        }
        for (let smallTextarea of textarea) {
          smallTextarea.addEventListener("focus", () => {
            menu.style.display = "none"; // скрываем меню
          });
          smallTextarea.addEventListener("blur", () => {
            menu.style.display = "flex"; // скрываем меню
          });
        }
      }, []);

        useEffect(() => {
          let inputs = document.querySelectorAll("input");
          function addH() {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
          }
          // Добавляем обработчик события на каждый элемент input, у которого type не равен file
          inputs.forEach(function (input) {
            if (input.type !== "file") {
              input.addEventListener("focus", addH);
            }
          });
          return () => {
            inputs.forEach(function (input) {
              if (input.type !== "file") {
                input.removeEventListener("focus", addH);
              }
            });
          };
        }, []);
};

export default useBlockInputs;