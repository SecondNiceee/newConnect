import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cl from "./FileInput.module.css";

import BlockSpinner from "../BlockSpinner/BlockSpinner";
import Text from "../../Text/Text";
import translation from "../../../functions/translate";
import NoPhotosComponent from "./ui/NoPhotosComponent";
let counter = 0;
const FileInput = ({
  className,
  files,
  setFiles,
  fileError,
  photosNames,
  clear = true,
}) => {
  const [images, setImages] = useState([]);
  const [isLoader, setLoader] = useState(false)
  const [loaderSize, setLoaderSize] = useState(files.length)

  const addFiles = useCallback(
    (newFiles, clear = false) => {
      let localImages = [];
      let localFiles = []
      setLoader(true)
      setLoaderSize(newFiles.length)
      newFiles.forEach((event) => {  
        resizeImage(event, 1640, 1640, 1).then((value) => {
          // reader.readAsDataURL(value);
          localImages.push(URL.createObjectURL(value));
          localFiles.push(value)
          if (localImages.length === newFiles.length) {
            if (!clear) {
              setFiles([...files, ...localFiles])
              setImages([...images, ...localImages]);
            } else {
              // setFiles([...localFiles])
              setImages([...localImages]);
            }
            setLoader(false)
          }
          
        }).catch( (value) =>{
          setLoader(false)
          window.Telegram.WebApp.showAlert(translation("Не удалось загрузить фотку, попробуйте еще раз или перезайдите на страницу."))
        } );
      });
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [files, images]
  );

  useEffect(() => {
    addFiles(files, clear);
    if (clear && files.length === 0) {
      setImages([]);
    }
    // eslint-disable-next-line
  }, [clear]);

  function resizeImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(
              new File([blob], file.name, {
                type: "image/png",
                lastModified: new Date().getTime(),
              })
            );
          }, "image/png");
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  const myRef = useRef(null);

  const photoStyle = useMemo(() => {
    if (fileError) {
      return {
        display: "flex",
        border: "1px solid #FF6767",
      };
    }
    if (files.length === 0) {
      return {
        display: "flex",
      };
    }
    return {};
  }, [fileError, files]);

  //   function hideKeyboard(element) {
  //     element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
  //     element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
  //     setTimeout(function() {
  //         element.blur();  //actually close the keyboard
  //         // Remove readonly attribute after keyboard is hidden.
  //         element.removeAttr('readonly');
  //         element.removeAttr('disabled');
  //     }, 100);
  // }


  const mainRef = useRef(null);

  const imageRef = useRef(null);


  const imageStyle = useMemo(() => {
    if (files.length > 0) {
      return {
        height:
          String((document.documentElement.offsetWidth - 28 - 18 - 15.6) / 3) +
          "px",
        width:
          String((document.documentElement.offsetWidth - 28 - 18 - 15.6) / 3) +
          "px",
        maxHeight:
          String((document.documentElement.offsetWidth - 28 - 18 - 15.6) / 3) +
          "px",
        maxWidth:
          String((document.documentElement.offsetWidth - 28 - 18 - 15.6) / 3) +
          "px",
      };
    }
    return {};
  }, [files]);

  useEffect( () => {  
    if (images.length < files.length){
      setLoader(true)
    }
    else{
      setLoader(false)
    }
  } , [images, files] )


  return (
    <>
      <div
        ref={mainRef}
        htmlFor="file"
        style={photoStyle}
        className={
          className ? [cl.FileInput, className].join(" ") : cl.FileInput
        }
      >

        {images.map((e, i) => {
          return (
            <div key={i} className={cl.imageFeetContainer}>
              <div
                onClick={() => {
                  myRef.current.scrollIntoView({ block: "nearest", behavior: 'smooth' })
                  setFiles(
                    [...files].filter((obj) => {
                      return files.indexOf(obj) !== images.indexOf(e);
                    })
                  );
                  setImages(
                    [...images].filter((obj) => {
                      return images.indexOf(obj) !== images.indexOf(e);
                    })
                  );
                  myRef.current.value = ""
                }}
                className={[cl.removeIcon, "_icon-trash"].join(" ")}
              />

              <img
                style={imageStyle}
                ref={imageRef}
                className={cl.imageFeet}
                src={e}
                alt=""
              />
            </div>
          );
        })}


    { isLoader && Array.from({ length: loaderSize }).map((e, i) => {
          return (
              <div key={i} className="filesLoader">
                <BlockSpinner style = {{...imageStyle , border : "1px solid black"}} />
              </div>
          )
        })}

      <NoPhotosComponent files = {files} images={images} imageStyle={imageStyle} counter = {counter} addFiles = {addFiles} ref={myRef} />

      </div>
      {fileError ? (
        <Text className={cl.fileError}>Добавьте хотя бы один пример работы</Text>
      ) : (
        <> </>
      )}
    </>
  );
};

export default memo(FileInput);
