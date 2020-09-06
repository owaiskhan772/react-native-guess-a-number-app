import * as Font from "expo-font";

export default function fetchFonts() {
  return Font.loadAsync({
    "open-sans": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
  });
}
