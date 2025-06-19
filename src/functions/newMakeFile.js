// const urlToObject= async(url , nam)=> {
//     const response = await fetch(url );
//     // here image is url/location of image
//     const blob = await response.blob();
//     const file = new File([blob], nam, {type: blob.type});
//     return file
//   }

async function makeNewFile(photos){

    // for (let i = 0; i < photos.length; i++){
    //     let file = await urlToObject(process.env.REACT_APP_HOST + '/' +folder + '/' + photos[i] , photos[i])
    //     files.push(file)
    // }
    return photos
}
export default makeNewFile