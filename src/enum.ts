//@icon
export enum IconType {
  STROKE = "stroke",
  FILL = "fill",
  CUSTOM = "custom",
}

//@root.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let DynamicComponentType: { IMAGE?: any; ICON?: any } = {};

(function (DynamicComponentType) {
  DynamicComponentType["ICON"] = "icons";
  DynamicComponentType["IMAGE"] = "images";
})(DynamicComponentType || (DynamicComponentType = {}));
