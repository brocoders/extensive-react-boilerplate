// @next
import { Archivo } from "next/font/google";

/***************************  THEME CONSTANT  ***************************/

export const APP_DEFAULT_PATH = "/"; /* "/dashboard */

export const DRAWER_WIDTH = 254;
export const MINI_DRAWER_WIDTH = 76 + 1; // 1px - for right-side border

/***************************  THEME ENUM  ***************************/

export let Themes: { THEME_HOSTING?: any } = {};

(function (Themes) {
  Themes["THEME_HOSTING"] = "hosting";
})(Themes || (Themes = {}));

export let ThemeMode: { LIGHT?: any } = {};

(function (ThemeMode) {
  ThemeMode["LIGHT"] = "light";
})(ThemeMode || (ThemeMode = {}));

export let ThemeDirection: { LTR?: any } = {};

(function (ThemeDirection) {
  ThemeDirection["LTR"] = "ltr";
})(ThemeDirection || (ThemeDirection = {}));

export let ThemeI18n: { EN?: any; FR?: any; RO?: any; ZH?: any } = {};

(function (ThemeI18n) {
  ThemeI18n["EN"] = "en";
  ThemeI18n["FR"] = "fr";
  ThemeI18n["RO"] = "ro";
  ThemeI18n["ZH"] = "zh";
})(ThemeI18n || (ThemeI18n = {}));

/***************************  CONFIG  ***************************/

const config = {
  currentTheme: Themes.THEME_HOSTING,
  mode: ThemeMode.LIGHT,
  themeDirection: ThemeDirection.LTR,
  miniDrawer: false,
  i18n: ThemeI18n.EN,
};

export default config;

/***************************  THEME - FONT FAMILY  ***************************/

const fontArchivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const FONT_ARCHIVO = fontArchivo.style.fontFamily;
