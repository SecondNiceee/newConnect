
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
  const [visibleLines, setVisibleLines] = useState(3)
  const [showReadMore, setShowReadMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [lineBreaks, setLineBreaks] = useState([])
  const [totalLines, setTotalLines] = useState(0)

  const textRef = useRef(null)
  const measureRef = useRef(null)

  // Функция для поиска позиций переносов строк
  const findLineBreaks = (text) => {
    if (!measureRef.current || !text) return []

    const element = measureRef.current
    const lineHeight = 21
    const breaks = []

    // Разбиваем текст на слова
    const words = text.split(/(\s+)/)
    let currentLine = ""
    let currentPosition = 0

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i]
      element.textContent = testLine

      // Если высота увеличилась, значит началась новая строка
      if (element.scrollHeight > lineHeight * (breaks.length + 1)) {
        // Сохраняем позицию конца предыдущей строки
        breaks.push(currentPosition)
        currentLine = words[i]
      } else {
        currentLine = testLine
      }

      currentPosition += words[i].length
    }

    // Добавляем конец текста
    breaks.push(text.length)

    return breaks
  }

  // Функция для получения текста до определенной строки
  const getTextUpToLine = (text, lineNumber) => {
    if (lineNumber >= lineBreaks.length) return text

    const endPosition = lineBreaks[lineNumber - 1]
    let result = text.substring(0, endPosition).trim()

    // Добавляем многоточие, если текст обрезан
    if (endPosition < text.length) {
      result += "..."
    }

    return result
  }

  useEffect(() => {
    if (!aboutU || aboutU.trim() === "") {
      setIsEmpty(true)
      setShowReadMore(false)
      setLineBreaks([])
      setTotalLines(0)
      return
    }

    setIsEmpty(false)

    // Ждем, пока элемент будет готов для измерений
    setTimeout(() => {
      if (measureRef.current) {
        const breaks = findLineBreaks(aboutU)
        setLineBreaks(breaks)
        setTotalLines(breaks.length)
        setShowReadMore(breaks.length > 3)
        setVisibleLines(3) // Сбрасываем к 3 строкам при изменении текста
      }
    }, 0)
  }, [aboutU])

  const displayText = isEmpty ? translation("Пользователь ничего не написал о себе") : aboutU

  let currentText
  if (isEmpty) {
    currentText = displayText
  } else if (visibleLines >= totalLines) {
    currentText = aboutU
  } else {
    currentText = getTextUpToLine(aboutU, visibleLines)
  }

  const handleToggle = () => {
    if (visibleLines >= totalLines) {
      // Если показан весь текст, сворачиваем к 3 строкам
      setVisibleLines(3)
    } else {
      // Показываем еще одну строку
      setVisibleLines((prev) => prev + 1)
    }
  }

  const isFullyExpanded = visibleLines >= totalLines

  return (
    <div {...props} className={`ur__town ${className || ""}`}>
      {darkSide && <div className="background" style={{ display: showReadMore ? "block" : "none" }} />}

      {/* Скрытый элемент для измерения текста */}
      <div
        ref={measureRef}
        className={`about__u-text ${textareaClassName || ""}`}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: "auto",
          width: textRef.current ? `${textRef.current.offsetWidth}px` : "100%",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "21px",
          top: "-9999px",
          left: "-9999px",
        }}
      />

      {/* Основной текстовый блок */}
      <div
        ref={textRef}
        className={`about__u-text ${textareaClassName || ""}`}
        style={{
          opacity: isEmpty ? 0.5 : 1,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "21px",
          minHeight: "21px",
          transition: "all 0.3s ease",
        }}
      >
        {currentText}
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
          <Text>
            {isFullyExpanded
              ? "Скрыть"
              : `Читать далее (${totalLines - visibleLines} строк${totalLines - visibleLines === 1 ? "а" : ""})`}
          </Text>
        </div>
      )}
    </div>
  )
}

export default memo(TextAboutMe)
