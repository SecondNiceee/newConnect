import axios from "axios";
import makeNewFile from "../newMakeFile";

export const getCardById = async (id) => {
  let response = await axios.get(
    `${process.env.REACT_APP_HOST}/card/findOne`,
    {
      params: {
        id: id
      },
      headers: {
        "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
      },
    }
  );
  const card = response.data;
    let files = await makeNewFile(card.folder, card.photos);
    const formattedCard =  {
      id: card.id,
      title: card.title,
      description: card.description,
      photosNames: card.photos,
      photos: files,
      createdAt: card.createdAt,
      views: card.views,
      links: card.links,
    };
  return formattedCard;
};