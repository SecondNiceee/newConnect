function makeNameFiles(photos , photosNames){
    let localPhotos = []
    photos.forEach((e, i) => {
        let blob = e.slice(0 , e.size, "image/png")
        let newFile = new File([blob], photosNames[i], {type: 'image/png'});
        localPhotos.push(newFile)
     })
     return localPhotos
}
export default makeNameFiles