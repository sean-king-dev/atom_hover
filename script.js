  const svg = document.getElementById("moleculeSVG");
  const circles = Array.from(svg.querySelectorAll("circle.cls-1"));

  const mouse = { x: 0, y: 0 };

  svg.addEventListener("mousemove", (e) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    mouse.x = svgP.x;
    mouse.y = svgP.y;

    circles.forEach(circle => {
      const cx = parseFloat(circle.getAttribute("cx"));
      const cy = parseFloat(circle.getAttribute("cy"));
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const radius = 40; // sensitivity distance
      if (dist < radius) {
        const repelForce = (radius - dist) / radius * 10;
        const offsetX = -dx / dist * repelForce;
        const offsetY = -dy / dist * repelForce;

        circle.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);
      } else {
        circle.setAttribute("transform", "translate(0,0)");
      }
    });
  });

  svg.addEventListener("mouseleave", () => {
    circles.forEach(circle => {
      circle.setAttribute("transform", "translate(0,0)");
    });
  });
