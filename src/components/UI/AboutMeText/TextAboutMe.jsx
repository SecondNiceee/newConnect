import { memo, useEffect, useRef, useState } from "react"
import "./TextAboutMe.css"
import Text from "../../Text/Text"
import translation from "../../../functions/translate"



const TextAboutMe = ({
  aboutU,
  darkSide = false,
  className = {},
  textareaClassName = {},
  buttonClassNames = {},
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const textRef = useRef(null)
  const hiddenTextRef = useRef(null)

  useEffect(() => {
    if (!aboutU || aboutU.trim() === "") {
      setIsEmpty(true)
      setShowReadMore(false)
      return
    }

    setIsEmpty(false)

    // Проверяем, нужна ли кнопка "Читать далее"
    if (textRef.current && hiddenTextRef.current) {
      const lineHeight = Number.parseInt(getComputedStyle(textRef.current).lineHeight)
      const maxHeight = lineHeight * 3 // 3 строки

      // Временно показываем полный текст для измерения
      hiddenTextRef.current.style.display = "block"
      const fullHeight = hiddenTextRef.current.scrollHeight
      hiddenTextRef.current.style.display = "none"

      setShowReadMore(fullHeight > maxHeight)
    }
  }, [aboutU])

  const displayText = isEmpty ? translation("Пользователь ничего не написал о себе") : aboutU

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div {...props} className={`ur__town ${className || ""}`}>
      {darkSide && <div className="background" style={{ display: showReadMore ? "block" : "none" }} />}

      {/* Скрытый элемент для измерения полной высоты */}
      <div
        ref={hiddenTextRef}
        className={`about__u-text ${textareaClassName || ""}`}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: "auto",
          width: "100%",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        {displayText}
      </div>

      {/* Основной текстовый блок */}
      <div
        ref={textRef}
        className={`about__u-text ${textareaClassName || ""}`}
        style={{
          opacity: isEmpty ? 0.5 : 1,
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? "none" : 3,
          WebkitBoxOrient: "vertical",
          lineHeight: "1.4em",
        }}
      >
        {displayText}
      </div>

      {/* Кнопка "Читать далее" / "Скрыть" */}
      {showReadMore && (
        <div
          className={`also ${buttonClassNames || ""}`}
          onClick={handleToggle}
          style={{
            display: "flex",
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          <Text>{isExpanded ? "Скрыть" : "Читать далее"}</Text>
        </div>
      )}
    </div>
  )
}

export default memo(TextAboutMe)
