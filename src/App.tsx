import { useState } from "react";
import { ImageZoomer } from "../lib/index";
import "../lib/styles/image-zoomer.css";
import "./App.css";

function App() {
  const [isZooming, setZooming] = useState(true);
  const [zoomFactor, setZoomFactor] = useState(2.5);
  const [lensSize, setLensSize] = useState(200);
  const [viewportPosition, setViewportPosition] = useState<
    "overlay" | "right" | "bottom" | "left" | "top"
  >("overlay");
  const [showCrosshair, setShowCrosshair] = useState(true);

  // Sample images for testing
  const sampleImages = [
    {
      src: "/dream-thumb.jpeg",
      zoomSrc: "/dream.jpeg",
      alt: "Sample landscape image",
      name: "Dream",
    },
    {
      src: "https://picsum.photos/id/1026/800/600",
      zoomSrc: "https://picsum.photos/id/1026/3200/2400",
      alt: "Sample landscape image",
      name: "Landscape",
    },
    {
      src: "https://picsum.photos/600/800?random=2",
      zoomSrc: "https://picsum.photos/1200/1600?random=2",
      alt: "Sample portrait image",
      name: "Portrait",
    },
    {
      src: "https://picsum.photos/500/500?random=3",
      zoomSrc: "https://picsum.photos/1000/1000?random=3",
      alt: "Sample square image",
      name: "Square",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(sampleImages[0]);
  const [useHighResZoom, setUseHighResZoom] = useState(true);

  return (
    <div className="app">
      <header>
        <h1>React ImageZoomer</h1>
        <p>An exploration in viewing large images on small screens.</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <button
            onClick={() => setZooming(!isZooming)}
            className={`zoom-toggle ${isZooming ? "active" : ""}`}
          >
            Zoom {isZooming ? "On" : "Off"}
          </button>
        </div>

        <div className="control-group">
          <label>
            Image:
            <select
              value={selectedImage.name}
              onChange={(e) => {
                const img = sampleImages.find(
                  (img) => img.name === e.target.value,
                );
                if (img) setSelectedImage(img);
              }}
            >
              {sampleImages.map((img) => (
                <option key={img.name} value={img.name}>
                  {img.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="control-group">
          <label>
            Zoom Factor: {zoomFactor}x
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.1"
              value={zoomFactor}
              onChange={(e) => setZoomFactor(parseFloat(e.target.value))}
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            Lens Size: {lensSize}px
            <input
              type="range"
              min="100"
              max="300"
              step="10"
              value={lensSize}
              onChange={(e) => setLensSize(parseInt(e.target.value))}
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            Viewport Position:
            <select
              value={viewportPosition}
              onChange={(e) =>
                setViewportPosition(
                  e.target.value as
                    | "overlay"
                    | "right"
                    | "bottom"
                    | "left"
                    | "top",
                )
              }
            >
              <option value="overlay">Overlay</option>
              <option value="right">Right</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="top">Top</option>
            </select>
          </label>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showCrosshair}
              onChange={(e) => setShowCrosshair(e.target.checked)}
            />
            Show Crosshair
          </label>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={useHighResZoom}
              onChange={(e) => setUseHighResZoom(e.target.checked)}
            />
            High-Res Zoom Images
          </label>
        </div>
      </div>

      <div className="demo-section">
        <h2>Interactive Demo</h2>
        <div className="image-container">
          <ImageZoomer
            zoom={isZooming}
            src={selectedImage.src}
            zoomSrc={useHighResZoom ? selectedImage.zoomSrc : undefined}
            alt={selectedImage.alt}
            zoomFactor={zoomFactor}
            lensSize={lensSize}
            viewportPosition={viewportPosition}
            viewportWidth={300}
            viewportHeight={300}
            showCrosshair={showCrosshair}
            onMouseEnter={() => console.log("Mouse entered")}
            onMouseLeave={() => console.log("Mouse left")}
            onMouseMove={(_, pos) => console.log("Mouse position:", pos)}
            onImageLoad={() => console.log("Image loaded successfully")}
            onImageError={() => console.log("Image failed to load")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
