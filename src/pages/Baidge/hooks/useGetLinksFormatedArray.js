const useGetLinksFormatedArray = ({ links, isFirstMyLink }) => {
  const notRecognisedLinks = [];

  // Список платформ с паттернами и метаданными
  const platformMatchers = [
    {
      pattern: "https://t.me/", 
      title: "Мой Telegram",
      profession: (link) => "@" + link.split("/").pop(),
      formatLink: (link) => link,
    },
    {
      pattern: "https://www.behance.net/", 
      title: "Behance",
      profession: "Портфолио",
    },
    {
      pattern: "https://dribbble.com", 
      title: "Dribbble",
      profession: "Портфолио",
    },
    {
      pattern: "https://www.artstation.com", 
      title: "ArtStation",
      profession: "Портфолио",
    },
    {
      pattern: "https://www.deviantart.com", 
      title: "DeviantArt",
      profession: "Портфолио",
    },
    {
      pattern: "https://ru.pinterest.com", 
      title: "Pinterest",
      profession: "Портфолио",
    },
    {
      pattern: "https://github.com/", 
      title: "GitHub",
      profession: "Код и разработка",
    },
    {
      pattern: "https://gitlab.com", 
      title: "GitLab",
      profession: "Код и разработка",
    },
    {
      pattern: "https://codepen.io", 
      title: "CodePen",
      profession: "Код и разработка",
    },
    {
      pattern: "https://replit.com", 
      title: "Replit",
      profession: "Код и разработка",
    },
    {
      pattern: "https://www.youtube.com", 
      title: "YouTube",
      profession: "Видео и ролики",
    },
    {
      pattern: "https://vimeo.com", 
      title: "Vimeo",
      profession: "Видео и ролики",
    },
    {
      pattern: "https://www.tiktok.com", 
      title: "TikTok",
      profession: "Видео и ролики",
    },
    {
      pattern: "https://www.instagram.com", 
      title: "Instagram",
      profession: "Соц.сети",
    },
    {
      pattern: "https://www.linkedin.com", 
      title: "LinkedIn",
      profession: "Опыт и резюме",
    },
    {
      pattern: "https://hh.ru", 
      title: "HH",
      profession: "Опыт и резюме",
    },
    {
      pattern: "https://www.notion.com", 
      title: "Notion",
      profession: "Портфолио",
    },
    {
      pattern: "https://tilda.cc", 
      title: "Tilda",
      profession: "Веб-сайт",
    },
    {
      pattern: "https://readymag.com", 
      title: "Readymag",
      profession: "Веб-сайт",
    },
    {
      pattern: "https://webflow.com", 
      title: "Webflow",
      profession: "Веб-сайт",
    },
    {
      pattern: "https://www.framer.com", 
      title: "Framer",
      profession: "Веб-сайт",
    },
    {
      pattern: "https://www.figma.com/", 
      title: "Figma",
      profession: "Веб-дизайн",
    },
  ];

  // Инициализируем массив для найденных платформ
  const matchedLinks = {};

  // Обрабатываем каждую ссылку
  for (let i = (isFirstMyLink ? 1 : 0); i < (links?.length || 0); i++) {
    const link = links[i];
    let isRecognized = false;

    for (const platform of platformMatchers) {
      if (link.includes(platform.pattern)) {
        matchedLinks[platform.title] = {
          title: platform.title,
          profession: platform.profession instanceof Function ? platform.profession(link) : platform.profession,
          link: platform.formatLink ? platform.formatLink(link) : link,
        };
        isRecognized = true;
        break;
      }
    }

    if (!isRecognized) {
      notRecognisedLinks.push({
        title: "Сайт",
        profession: link,
        link: link,
      });
    }
  }

  // Формируем итоговый массив в нужном порядке
  const orderedPlatforms = [
    "Мой Telegram",
    "HH",
    "Telegram-канал",
    "Behance",
    "ArtStation",
    "Dribbble",
    "DeviantArt",
    "Pinterest",
    "Notion",
    "GitLab",
    "GitHub",
    "Bitbucket",
    "CodePen",
    "Replit",
    "YouTube",
    "Vimeo",
    "TikTok",
    "Instagram",
    "LinkedIn",
    "Tilda",
    "Readymag",
    "Webflow",
    "Framer",
    "Figma",
  ];

  const specialCases = [];

  if (isFirstMyLink && links[0]) {
    specialCases.push({
      title: "Мой Telegram",
      profession: "@" + links[0],
      link: "https://t.me/"  + links[0],
    });
  }

  if (matchedLinks["Telegram-канал"] || links.some((l) => l.includes("https://t.me/")))  {
    const channelLink = matchedLinks["Telegram-канал"]?.link || links.find((l) => l.includes("https://t.me/")); 
    specialCases.push({
      title: "Telegram-канал",
      profession: "@" + (channelLink?.split("/").pop() || ""),
      link: channelLink,
    });
  }

  // Формируем итоговый массив
  const result = [
    ...specialCases,
    ...orderedPlatforms
      .filter(title => matchedLinks[title])
      .map(title => matchedLinks[title]),
    ...notRecognisedLinks,
  ];

  return result;
};

export default useGetLinksFormatedArray;