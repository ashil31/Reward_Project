import { useContext } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import { ThemeContext } from "../context/ThemeContext";

// Spin animation
const spinStyle = {
  animation: "spin 20s linear infinite",
};

const size = 400;
const radius = 180;
const iconHeight = 150;
const iconWidth = 90;

const imgArray = [img1, img2, img3, img4, img1, img2, img3, img4];

export default function BackgroundEffects() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const dotBg = isDark
    ? "radial-gradient(#404040 1px, transparent 1px)"
    : "radial-gradient(#d4d4d4 1px, transparent 1px)";

  const circleStroke = isDark ? "#606060" : "#A3A3A3";

  return (
    <>
      {/* Dotted background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: dotBg,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top-left circle */}
      <div
        aria-hidden
        className="absolute z-10 -top-[160px] -left-[260px] md:-top-[100px] md:-left-[250px] pointer-events-none"
      >
        <CircleLogoSide stroke={circleStroke} icons={imgArray} />
      </div>

      {/* Bottom-right circle */}
      <div
        aria-hidden
        className="absolute z-10 -bottom-[260px] -right-[160px] md:-bottom-[200px] md:-right-[200px] pointer-events-none"
      >
        <CircleLogoSide stroke={circleStroke} icons={imgArray} />
      </div>
    </>
  );
}

function CircleLogoSide({ icons }) {
  // Use the provided icons array
  const iconsCount = icons.length;

  return (
    <div style={spinStyle} className="relative w-[400px] h-[400px]">

      {icons.map((src, i) => {
        const angle = (360 / iconsCount) * i;
        const radians = (angle * Math.PI) / 180;

        const x = size / 2 + radius * Math.cos(radians) - iconWidth / 2;
        const y = size / 2 + radius * Math.sin(radians) - iconHeight / 2;

        return (
          <img
            key={i}
            src={src}
            alt={`Icon ${i + 1}`}
            draggable={false}
            className="absolute icon-shadow"
            style={{
              width: iconWidth,
              height: iconHeight,
              top: y,
              left: x,
              transition: "transform 0.3s ease",
            }}
          />
        );
      })}

     
    </div>
  );
}
