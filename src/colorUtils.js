// export function getTextColorHEX(bgColor, lightTextColor, darkTextColor){
//     const colors = [bgColor, lightTextColor, darkTextColor];

//     const colorLuminance= colors.map(color =>{
//         const colorRGB = convertToRGB(color); 
//         const linearColorRGB = convertToLinear(colorRGB);
//         const colorLuminance=calcRelativeLuminance(linearColorRGB);
//         return colorLuminance;

//     })

//     console.log(colorLuminance);
//     const greatContrastIndex = getGreaterContrast(colorLuminance);
//     console.log(greatContrastIndex);
    
//     console.log(colors[greatContrastIndex])
//     return colors[greatContrastIndex];
    
    

//     //return argument color
// }

// export function getGreaterContrast(colorsLuminance){
//     const mainColor = colorsLuminance[0];
//     const lighterColor = colorsLuminance[1];
//     const darkerColor = colorsLuminance[2];

//     let lighterColorRatio = (lighterColor + 0.05) / (mainColor+0.05);
//     let darkerColorRatio = (main + 0.05) / (mainColor+0.05)


//     if(lighterColorRatio > darkerColorRatio ){
//         console.log(lighterColorRatio);
        
//         return colorsLuminance.indexOf(darkerColor);
//     }
//     else{
//         console.log(darkerColorRatio)
//        return colorsLuminance.indexOf(lighterColor);
//     }


// }

// export function calcRelativeLuminance(linearRGB){    
//     return (linearRGB[0] * 0.2126) +
//     (linearRGB[1] * 0.7152) +
//     (linearRGB[2] * 0.0722);
// }

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