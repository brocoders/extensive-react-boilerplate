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
