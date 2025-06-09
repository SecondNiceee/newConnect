function sortFiles(photosNames , files){

    let removedArr = []
    let addedArr = []
    for (let fileName of photosNames ){
        if (!files.find(e => e.name === fileName)){
          removedArr.push(fileName)
        }
    }
    for (let file of files){
      if (file.name.includes('nick')){
        addedArr.push(file)
      }
    }
    return {
        removedArr : removedArr,
        addedArr : addedArr
    }
    
}
export default sortFiles