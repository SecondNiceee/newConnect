const urlToObject= async(url , nam)=> {
    console.log(url);
    const response = await fetch(url);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], nam, {type: blob.type});
    return file
  }

async function makeNewFile(photos){
    const files = [];
    for (let i = 0; i < photos.length; i++){
        let file = await urlToObject(photos[i], photos[i])
        files.push(file)
    }
    return files
}
export default makeNewFile