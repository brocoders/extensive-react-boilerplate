import dynamic from "next/dynamic";
import { DynamicComponentType } from "@/enum";

/***************************  DYNAMIC - IMPORT  ***************************/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadComponent(component: string, type: any) {
  switch (type) {
    case DynamicComponentType.IMAGE:
      return import(`@/images/${component}`);
    case DynamicComponentType.ICON:
      return import(`@/icons/${component}`);
    default:
      return import(`@/components/logo`);
  }
}

/***************************  DYNAMIC COMPONENT  ***************************/

/**
 *
 * @param component: string = Used for rendering manually modified SVG components, such as images, icons
 * @param type: DynamicComponentType = Used to choose the path of the rendering component.
 * @param props: any = Used to set dynamic props, such as sx, size, and color.
 * @returns = Import the component dynamically and pass the rendering component.
 */

// eslint-disable-next-line
function DynamicComponent({
  component,
  type,
  props,
}: {
  component: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
}) {
  const ImportedComponent = dynamic(() => loadComponent(component, type), {
    ssr: false,
  });

  return <ImportedComponent {...props} />;
}

export default DynamicComponent;
