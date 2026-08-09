function getTextColor(bgColor){
    
}

function getContrastRatio(bgColor){

}

export function convertToLinear(rgbColor){
    rgbColor = rgbColor.map(color => color / 255);
    rgbColor = rgbColor.map(color_sRGB => {
        if(color_sRGB <= 0.03928){
            return color_sRGB /12.92
        }else{
            
            return ((color_sRGB + 0.055) / 1.055) ^ 2.4
        }
    })
    return rgbColor;
    
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