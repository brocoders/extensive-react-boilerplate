/***************************  CARD RADIUS - STYLES  ***************************/

export function getRadiusStyles(radius: number, ...corners: string[]) {
  const borderRadiusStyles: Record<string, any> = {
    "& .MuiPaper-root": {},
  };

  corners.forEach((corner) => {
    switch (corner) {
      case "topLeft":
        borderRadiusStyles.borderTopLeftRadius = radius;
        borderRadiusStyles["& .MuiPaper-root"] = {
          borderTopLeftRadius: radius,
        };
        break;
      case "topRight":
        borderRadiusStyles.borderTopRightRadius = radius;
        borderRadiusStyles["& .MuiPaper-root"] = {
          borderTopRightRadius: radius,
        };
        break;
      case "bottomLeft":
        borderRadiusStyles.borderBottomLeftRadius = radius;
        borderRadiusStyles["& .MuiPaper-root"] = {
          borderBottomLeftRadius: radius,
        };
        break;
      case "bottomRight":
        borderRadiusStyles.borderBottomRightRadius = radius;
        borderRadiusStyles["& .MuiPaper-root"] = {
          borderBottomRightRadius: radius,
        };
        break;
      default:
        break;
    }
  });

  return borderRadiusStyles;
}
