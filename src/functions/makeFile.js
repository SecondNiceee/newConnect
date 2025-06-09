function makeFile(files , filesNames){
    let localFiles = []
    for (let i = 0 ; i < files.length; i++){
  
        let uintArray = new Uint8Array(files[i].data);
        let blob = new Blob([uintArray], { type: 'image/png' });
        let fileName =  filesNames[i]  ;
        let file = new File([blob], fileName, { type: 'image/png' });
        localFiles.push(file)
      }
    return localFiles
}
export default makeFile