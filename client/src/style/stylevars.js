const devicesizes = {
  mobile: '768px',
  tablet: '1280px',
  desktop: '2160px',
}

export const device = {
  mobile: `(max-width: ${devicesizes.mobile})`, 
  tablet: `(max-width: ${devicesizes.tablet})`,
  desktop: `(max-width: ${devicesizes.desktop})`,
};

export const colors = {
  black: "#191919",
  green: "#77C31E",
  darkblue: "#24334C",
  lightblue: "#3B6979",
  white: 'white'
}

export const ratingColors = {
  legendary: "#ff8000",
  epic: "#a335ee",
  rare: "#0070dd",
  uncommon: "#1eff00",
  common: "#ffffff",
  poor: "#9d9d9d",
}