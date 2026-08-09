// ref: https://www.w3.org/WAI/GL/wiki/Relative_luminance
// to be improved
export function getTextColorHEX(bgColor, lightTextColor, darkTextColor){
    const colors = [bgColor, lightTextColor, darkTextColor];

    const colorLuminance= colors.map(color =>{
        const colorRGB = convertToRGB(color); 
        const linearColorRGB = convertToLinear(colorRGB);
        const colorLuminance=calcRelativeLuminance(linearColorRGB);
        return colorLuminance;

    })

    const greatContrastIndex = getGreaterContrast(colorLuminance);
    return colors[greatContrastIndex];
    
}

export function getGreaterContrast(colorsLuminance){
    const mainColor = colorsLuminance[0];
    const lighterColorText = colorsLuminance[1];
    const darkerColorText = colorsLuminance[2];


    let lightTextRatio;
    if(lighterColorText > mainColor) {
        //text is brighter
        lightTextRatio = (lighterColorText + 0.05) / (mainColor+0.05);
    }else{
        lightTextRatio = (mainColor + 0.05) / (lighterColorText+0.05);
    }
    
    let darkTextRatio;
    if(darkerColorText > mainColor){
        //text is brighter
        darkTextRatio = (darkerColorText + 0.05) / (mainColor+0.05);
    }else{
        darkTextRatio = (mainColor + 0.05) / (darkerColorText+0.05);
    }

    if(lightTextRatio > darkTextRatio ){  
        return colorsLuminance.indexOf(lighterColorText);
    }
    else{
       return colorsLuminance.indexOf(darkerColorText);
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
            
            return ((color_sRGB + 0.055) / 1.055) ** 2.4
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