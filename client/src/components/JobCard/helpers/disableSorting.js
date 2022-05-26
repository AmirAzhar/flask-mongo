export default function disableSorting(style, snapshot) {
  if (!snapshot.isDragging) return {};
  if (snapshot.isDragging)
    return {
      ...style,
      boxShadow: `0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12),0 16px 16px rgba(0,0,0,0.12)`,
    };
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}
