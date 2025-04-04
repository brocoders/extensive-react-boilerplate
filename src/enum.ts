/* eslint-disable @typescript-eslint/no-explicit-any */
//@icon
export enum IconType {
  STROKE = "stroke",
  FILL = "fill",
  CUSTOM = "custom",
}

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
