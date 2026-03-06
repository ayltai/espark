const hexToRgb = (hex : string) : {
    r : number,
    g : number,
    b : number,
} => {
    const bigint = parseInt(hex.replace('#', ''), 16);

    return {
        r : (bigint >> 16) & 255,
        g : (bigint >> 8) & 255,
        b : bigint & 255,
    };
};

const srgbToLinear = (colour : number) => {
    const c = colour / 255;

    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

const luminance = ({
    r,
    g,
    b,
} : {
    r : number,
    g : number,
    b : number,
}) => 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);

const contrastRatio = (l1 : number, l2 : number) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

export const getContrastColour = (hex : string) : string => {
    const bgLuminance   = luminance(hexToRgb(hex));
    const whiteContrast = contrastRatio(bgLuminance, 1);
    const blackContrast = contrastRatio(bgLuminance, 0);

    return whiteContrast >= blackContrast ? '#ffffff' : '#000000';
};
