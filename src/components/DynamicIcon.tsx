/***************************  DYNAMIC - TABLER ICONS  ***************************/

export default function DynamicIcon({
  name,
  size = 24,
  color = "black",
}: {
  name: any;
  size?: number;
  color?: string;
  stroke?: number;
}) {
  // Dynamically get the icon component based on the `name` prop
  const IconComponent = name;

  // If the provided `name` does not match any icon in TablerIcons, return null to avoid rendering errors
  if (!IconComponent) {
    return null;
  }

  return <IconComponent style={{ fontSize: size, color }} />;
}
