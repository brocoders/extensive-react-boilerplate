/* eslint-disable @typescript-eslint/no-explicit-any */
//@icon
export enum IconType {
  STROKE = "stroke",
  FILL = "fill",
  CUSTOM = "custom",
}

/** Tabs custom props `type` enum */
export let TabsType: { SEGMENTED?: any } = {};

(function (TabsType) {
  TabsType["SEGMENTED"] = "segmented";
})(TabsType || (TabsType = {}));

/** Chart custom view mode enum */
export let ViewMode: { DAILY?: any; MONTHLY?: any; YEARLY?: any } = {};

(function (ViewMode) {
  ViewMode["DAILY"] = "Daily";
  ViewMode["MONTHLY"] = "Monthly";
  ViewMode["YEARLY"] = "Yearly";
})(ViewMode || (ViewMode = {}));

//@root.ts

export let DynamicComponentType: { IMAGE?: any; ICON?: any } = {};

(function (DynamicComponentType) {
  DynamicComponentType["ICON"] = "icons";
  DynamicComponentType["IMAGE"] = "images";
})(DynamicComponentType || (DynamicComponentType = {}));

//@footer.ts
export let CopyrightType: { TYPE3?: any; TYPE1?: any; TYPE2?: any } = {};

(function (CopyrightType) {
  CopyrightType["TYPE1"] = "default";
  CopyrightType["TYPE2"] = "type2";
  CopyrightType["TYPE3"] = "type3";
})(CopyrightType || (CopyrightType = {}));

/** LinearProgress custom props `type` enum */
export let LinearProgressType: { LIGHT?: any } = {};

(function (LinearProgressType) {
  LinearProgressType["LIGHT"] = "light";
})(LinearProgressType || (LinearProgressType = {}));

/** Avatar custom props `size` enum */
export let AvatarSize: {
  XS?: any;
  XXS?: any;
  BADGE?: any;
  SM?: any;
  MD?: any;
  LG?: any;
  XL?: any;
} = {};

(function (AvatarSize) {
  AvatarSize["BADGE"] = "badge";
  AvatarSize["XXS"] = "xxs";
  AvatarSize["XS"] = "xs";
  AvatarSize["SM"] = "sm";
  AvatarSize["MD"] = "md";
  AvatarSize["LG"] = "lg";
  AvatarSize["XL"] = "xl";
})(AvatarSize || (AvatarSize = {}));

/** Chip custom props `position` enum */
export let ChipIconPosition: { RIGHT?: any } = {};

(function (ChipIconPosition) {
  ChipIconPosition["RIGHT"] = "right";
})(ChipIconPosition || (ChipIconPosition = {}));
