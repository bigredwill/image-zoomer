import { useState } from "react";
import { ImageZoomer } from "../lib/index";
import "../lib/styles/image-zoomer.css";
import "./App.css";

function App() {
  const [isZooming, setZooming] = useState(false);
  const [zoomFactor, setZoomFactor] = useState(2.5);
  const [lensSize, setLensSize] = useState(200);
  const [viewportPosition, setViewportPosition] = useState<
    "right" | "bottom" | "left" | "top"
  >("right");
  const [overlayMode, setOverlayMode] = useState(false);
  const [showCrosshair, setShowCrosshair] = useState(true);

  // Sample images for testing
  const sampleImages = [
    {
      src: "https://picsum.photos/800/600?random=1",
      alt: "Sample landscape image",
      name: "Landscape",
    },
    {
      src: "https://picsum.photos/600/800?random=2",
      alt: "Sample portrait image",
      name: "Portrait",
    },
    {
      src: "https://picsum.photos/500/500?random=3",
      alt: "Sample square image",
      name: "Square",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(sampleImages[0]);

  return (
    <div className="app">
      <header>
        <h1>ImageZoomer Demo</h1>
        <p>A controlled, stateless image zoom component</p>
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
              onChange={(e) => setViewportPosition(e.target.value as any)}
              disabled={overlayMode}
            >
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
              checked={overlayMode}
              onChange={(e) => setOverlayMode(e.target.checked)}
            />
            Overlay Mode (follows mouse)
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
      </div>

      <div className="demo-section">
        <h2>Interactive Demo</h2>
        <div className="image-container">
          <ImageZoomer
            zoom={isZooming}
            src={selectedImage.src}
            alt={selectedImage.alt}
            zoomFactor={zoomFactor}
            lensSize={lensSize}
            viewportPosition={viewportPosition}
            viewportWidth={300}
            viewportHeight={300}
            overlayMode={overlayMode}
            showCrosshair={showCrosshair}
            onMouseEnter={() => console.log("Mouse entered")}
            onMouseLeave={() => console.log("Mouse left")}
            onMouseMove={(_, pos) => console.log("Mouse position:", pos)}
            onImageLoad={() => console.log("Image loaded successfully")}
            onImageError={() => console.log("Image failed to load")}
          />
        </div>
      </div>

      <div className="demo-section">
        <h2>Multiple Examples</h2>
        <div className="examples-grid">
          <div className="example">
            <h3>Small Lens</h3>
            <ImageZoomer
              zoom={true}
              src="https://picsum.photos/400/300?random=4"
              alt="Small lens example"
              lensSize={120}
              zoomFactor={3}
              viewportWidth={200}
              viewportHeight={200}
            />
          </div>

          <div className="example">
            <h3>High Zoom</h3>
            <ImageZoomer
              zoom={true}
              src="https://picsum.photos/400/300?random=5"
              alt="High zoom example"
              zoomFactor={4}
              viewportPosition="right"
            />
          </div>

          <div className="example">
            <h3>Overlay Mode</h3>
            <ImageZoomer
              zoom={true}
              src="https://picsum.photos/400/300?random=6"
              alt="Overlay mode example"
              overlayMode={true}
              viewportWidth={200}
              viewportHeight={200}
              lensSize={120}
            />
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Features</h2>
        <ul>
          <li>✅ Controlled/stateless component</li>
          <li>✅ Configurable zoom factor and lens size</li>
          <li>✅ Multiple viewport positions (right, left, top, bottom)</li>
          <li>✅ Overlay mode (viewport follows mouse cursor)</li>
          <li>✅ Square lens design</li>
          <li>✅ Crosshair for precise zoom targeting</li>
          <li>✅ CSS custom properties for theming</li>
          <li>✅ Responsive design</li>
          <li>✅ Accessibility support</li>
          <li>✅ TypeScript support</li>
          <li>✅ Zero runtime dependencies</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
