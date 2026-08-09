function getTextColor(bgColor){
    
}

function getContrastRatio(bgColor){

}

export function convertToLinear(rgbColor){
    
}

export function convertToRGB(hexColor){
    hexColor = hexColor.slice(1);
    hexColor = hexColor.split("");
    
    hexColor.splice(2, 0, "/");
    hexColor.splice(5, 0, "/");
    hexColor = hexColor.join("");
    let rgb = hexColor.split("/");
    return rgb.map(item=> parseInt(item, 16));    
}