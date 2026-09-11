// Visual tokens pulled from the original index.html so the Remotion
// composition looks identical to the browser version.

export const pageBackground = "#0a0a0a";

export const redGradient = "linear-gradient(145deg, #b71c1c, #ff1744)";
export const blueGradient = "linear-gradient(145deg, #0a2a8a, #1e4bff)";

export const cardShadow = "0 20px 60px rgba(0, 0, 0, 0.9)";

export const profileBorder = "4px solid rgba(255, 255, 255, 0.9)";
export const profileShadow = "0 6px 20px rgba(0, 0, 0, 0.6)";

export const textShadow = "0 2px 8px rgba(0, 0, 0, 0.6)";
export const bigNumberShadow = "0 3px 12px rgba(0, 0, 0, 0.7)";
export const labelShadow = "0 1px 4px rgba(0, 0, 0, 0.3)";

export const vsBadgeBackground = "#0a0a0a";
export const vsBadgeBorder = "2px solid rgba(255, 255, 255, 0.4)";
export const vsBadgeShadow = "0 4px 30px rgba(0, 0, 0, 0.9)";

// Sizes are tuned for the 1080x1920 canvas (the HTML used ~360x640
// in the browser; everything below is roughly 3x to match the larger
// resolution while keeping the same proportions).
export const sizes = {
	profileSize: 240,
	profileBorderWidth: 12,
	cardRadius: 108,
	nameFontSize: 64,
	subsFontSize: 120,
	labelFontSize: 26,
	vsFontSize: 76,
	dividerBorderWidth: 9,
} as const;
