const svgNS = "http://www.w3.org/2000/svg";
function drawCircle(attr, svg) {
  const el = document.createElementNS(svgNS, "circle");
  el.setAttribute("cx", attr.cx + 5);
  el.setAttribute("cy", attr.cy + 4);
  el.setAttribute("r", attr.r);
  el.setAttribute("stroke", attr.stroke);
  el.setAttribute("stroke-width", attr.strokeWidth);
  el.setAttribute("stroke-opacity", attr.strokeOpacity);
  el.setAttribute("fill", "transparent");
  el.setAttribute("data-circle", "circle");
  svg.insertBefore(el, svg.firstChild);
}

function drawCross(attr, svg) {
  const el = document.createElementNS(svgNS, "path");
  el.setAttribute(
    "d",
    `M ${attr.x + 15} ${
      attr.y
    }c 0.12 -0.03 0.24 -0.03 0.36 0.03c 0.03 0.03 0.93 0.72 1.95 1.56l 1.86 1.5l 1.86 -1.5c 1.02 -0.84 1.92 -1.53 1.95 -1.56c 0.21 -0.12 0.33 -0.09 0.75 0.24c 0.3 0.27 0.36 0.36 0.36 0.54c 0 0.03 -0.03 0.12 -0.06 0.18c -0.03 0.06 -0.9 0.75 -1.89 1.56l -1.8 1.47c 0 0.03 0.81 0.69 1.8 1.5c 0.99 0.81 1.86 1.5 1.89 1.56c 0.03 0.06 0.06 0.15 0.06 0.18c 0 0.18 -0.06 0.27 -0.36 0.54c -0.42 0.33 -0.54 0.36 -0.75 0.24c -0.03 -0.03 -0.93 -0.72 -1.95 -1.56l -1.86 -1.5l -1.86 1.5c -1.02 0.84 -1.92 1.53 -1.95 1.56c -0.21 0.12 -0.33 0.09 -0.75 -0.24c -0.3 -0.27 -0.36 -0.36 -0.36 -0.54c 0 -0.03 0.03 -0.12 0.06 -0.18c 0.03 -0.06 0.9 -0.75 1.89 -1.56l 1.8 -1.47c 0 -0.03 -0.81 -0.69 -1.8 -1.5c -0.99 -0.81 -1.86 -1.5 -1.89 -1.56c -0.06 -0.12 -0.09 -0.21 -0.03 -0.36c 0.03 -0.09 0.57 -0.57 0.72 -0.63z`
  );
  el.setAttribute("stroke", attr.stroke);
  el.setAttribute("stroke-width", attr.strokeWidth);
  el.setAttribute("stroke-opacity", attr.strokeOpacity);
  svg.insertBefore(el, svg.firstChild);
}

export function draw_circle_around_notehead({ x: string, y: string }, svg) {
  drawCircle(
    {
      cx: x,
      cy: y,
      r: 8,
      stroke: "green",
      strokeWidth: 2,
      strokeOpacity: 1
    },
    svg
  );
}

function draw_cross_around_notehead(attr, svg) {
  drawCross(
    {
      x: attr.x,
      y: attr.y,
      stroke: "red",
      strokeWidth: 2,
      strokeOpacity: 1
    },
    svg
  );
}
