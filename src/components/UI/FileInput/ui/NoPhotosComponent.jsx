import React, { forwardRef } from 'react';
import cl from "../FileInput.module.css";
import translation from '../../../../functions/translate';
import { device } from '../../../../constants/device';
const NoPhotosComponent = forwardRef(({files, images, imageStyle, counter, addFiles}, ref) => {
    return (
        <label
          style={files.length === 5 ? { display: "none" } : imageStyle}
          className={images.length !== 0 ? cl.ActiveMainLabel : cl.MainLabel}
          htmlFor="file"
        >
          <input
            ref={ref}
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                if (event.target.files.length + files.length > 5) {
                  window.Telegram.WebApp.showAlert(translation("Максимум 5 файлов"));
                } else {
                  let newFiles = [];
                  for (let i = 0; i < event.target.files.length; i++) {
                    let photo = event.target.files[i];
                    let blob = photo.slice(0, photo.size, "image/png");
                    let newFile = new File(
                      [blob],
                      "nick" + String(counter) + ".png",
                      { type: "image/png" }
                    );
                    counter += 1;
                    newFiles.push(newFile);
                  }
                  addFiles(newFiles);
                }
              }
            }}
            type="file"
            multiple={device.includes("android") ? false : true}
            name="file"
            id="file"
            accept="image/*"
            className={cl.none}
          />

          <img src="/images/AdCreating/LoadImageIcon.svg" className='w-[24px] h-[24px]' alt="" />

          <p className='!text-[#2EA6FF] !text-[17px] !font-sf-pro-display-600 !font-semibold leading-[15.643px] tracking-[0.34px]'>Добавить фото</p>

        </label>
    );
});

export default NoPhotosComponent;