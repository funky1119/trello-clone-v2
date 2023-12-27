import { DefaultTheme } from "styled-components";

const theme: { light: DefaultTheme; dark: DefaultTheme } = {
  light: {
    bgColor: "#ddbea9",
    textColor: "#003049",
    accentColor: "#7209b7",
    iconButton: "#1F1E29",
    buttonColor: "rgba(183, 77, 25, 0.5)",
    activeButtonColor: "rgba(234, 186, 27, 0.5)",
  },
  dark: {
    bgColor: "#1F1E29",
    textColor: "#F9F6F1",
    accentColor: "#12A1B1",
    iconButton: "#E1DFF5",
    buttonColor: "rgba(34, 184, 167, 0.5)",
    activeButtonColor: "rgba(186, 232, 214, 0.5)",
  },
};

export { theme };
