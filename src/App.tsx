import { useState } from "react";
import { ImageZoomer } from "../lib/index";
import "../lib/styles/image-zoomer.css";
import "./App.css";

function App() {
  const [isZooming, setZooming] = useState(true);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [zoomFactor, setZoomFactor] = useState(4);
  const [lensSize, setLensSize] = useState(300);
  const [viewportPosition, setViewportPosition] = useState<
    "overlay" | "right" | "bottom" | "left" | "top"
  >("overlay");
  const [showCrosshair, setShowCrosshair] = useState(true);

  // Sample images for testing
  const sampleImages = [
    {
      src: `${import.meta.env.BASE_URL}dream-thumb.jpeg`,
      zoomSrc: `${import.meta.env.BASE_URL}dream.jpeg`,
      alt: "Sample landscape image",
      name: "Dream",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(sampleImages[0]);
  const [useHighResZoom, setUseHighResZoom] = useState(true);

  return (
    <div className="app">
      <div className="main-content">
        <div className="demo-section">
          <p>
            Move your mouse over the image to see a lens that displays a zoomed
            in version of the image.
          </p>
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
              onMouseLeave={() => {
                console.log("Mouse left");
                setMousePosition(null);
              }}
              onMouseMove={(_, pos) => {
                console.log("Mouse position:", pos);
                setMousePosition(pos);
              }}
              onImageLoad={() => console.log("Image loaded successfully")}
              onImageError={() => console.log("Image failed to load")}
            />
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <h3>Zoom Control</h3>
          <div className="control-row">
            <label>Enable Zoom</label>
            <button
              onClick={() => setZooming(!isZooming)}
              className={`zoom-toggle ${isZooming ? "active" : ""}`}
            >
              {isZooming ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        <div className="control-group">
          <h3>Image Selection</h3>
          <div className="control-row">
            <label>Image</label>
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
          </div>
          <div className="control-row">
            <label>High-Res Zoom</label>
            <input
              type="checkbox"
              checked={useHighResZoom}
              onChange={(e) => setUseHighResZoom(e.target.checked)}
            />
          </div>
        </div>

        <div className="control-group">
          <h3>Zoom Settings</h3>
          <div className="control-row">
            <label>Zoom Factor</label>
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.1"
              value={zoomFactor}
              onChange={(e) => setZoomFactor(parseFloat(e.target.value))}
            />
            <span className="value-display">{zoomFactor}x</span>
          </div>
          <div className="control-row">
            <label>Lens Size</label>
            <input
              type="range"
              min="100"
              max="800"
              step="10"
              value={lensSize}
              onChange={(e) => setLensSize(parseInt(e.target.value))}
            />
            <span className="value-display">{lensSize}px</span>
          </div>
        </div>

        <div className="control-group">
          <h3>Viewport Settings</h3>
          <div className="control-row">
            <label>Position</label>
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
          </div>
          <div className="control-row">
            <label>Show Crosshair</label>
            <input
              type="checkbox"
              checked={showCrosshair}
              onChange={(e) => setShowCrosshair(e.target.checked)}
            />
          </div>
        </div>

        <header>
          <h1>React ImageZoomer</h1>
          <p>
            An exploration in viewing large images on small desktop screens.
          </p>
          <p>
            I wanted something that was minimal and allowed me to quickly
            inspect an image without manually zooming.
          </p>
          <p>
            Source, implementation, and usage, see:{" "}
            <a href="https://github.com/bigredwill/image-zoomer">
              github.com/bigredwill/image-zoomer
            </a>
          </p>
        </header>
      </div>

      {mousePosition && (
        <div className="mouse-position">
          {mousePosition.x.toFixed(0)}, {mousePosition.y.toFixed(0)}
        </div>
      )}
    </div>
  );
}

export default App;
