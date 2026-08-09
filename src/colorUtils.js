function getTextColor(bgColor){
    
}

export function getGreaterContrast(mainColor, color1, color2){
    let first_ratio = (mainColor + 0.05) / (color1+0.05);
    let second_ratio = (color2 + 0.05) / (mainColor+0.05)

    if(first_ratio > second_ratio ){
        return color1
    }
    else{
        return color2;
    }


}

export function calcRelativeLuminance(linearRGB){
    return (linearRGB[0] * 0.2126) +
    (linearRGB[1] * 0.7152) +
    (linearRGB[2] * 0.0722);
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