import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";

export interface ImageZoomerProps {
  /** Whether zoom is currently active */
  zoom: boolean;
  /** Image source URL */
  src: string;
  /** High-resolution image source URL for zoom viewport (optional) */
  zoomSrc?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Additional CSS class name */
  className?: string;
  /** Zoom magnification factor (default: 2.5) */
  zoomFactor?: number;
  /** Size of the zoom lens in pixels (default: 200) */
  lensSize?: number;
  /** Width of the zoom viewport in pixels (default: 300) */
  viewportWidth?: number;
  /** Height of the zoom viewport in pixels (default: 300) */
  viewportHeight?: number;
  /** Position of the zoom viewport relative to the image */
  viewportPosition?: "overlay" | "right" | "bottom" | "left" | "top";
  /** Offset of the viewport from the image edge in pixels (default: 20) */
  viewportOffset?: number;
  /** Whether to show crosshair at zoom center point (default: true) */
  showCrosshair?: boolean;
  /** Called when mouse enters the image */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Called when mouse leaves the image */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Called when mouse moves over the image */
  onMouseMove?: (
    event: React.MouseEvent<HTMLDivElement>,
    position: { x: number; y: number },
  ) => void;
  /** Called when image loads successfully */
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Called when image fails to load */
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

interface ImageDimensions {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

const getImageDimensions = (img: HTMLImageElement): ImageDimensions => {
  const rect = img.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
};

const getMousePosition = (
  event: React.MouseEvent<HTMLDivElement>,
  container: HTMLDivElement,
): Position => {
  const rect = container.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const ImageZoomer: React.FC<ImageZoomerProps> = ({
  zoom,
  src,
  zoomSrc,
  alt,
  className = "",
  zoomFactor = 2.5,
  lensSize = 200,
  viewportWidth = 300,
  viewportHeight = 300,
  viewportPosition = "overlay",
  viewportOffset = 20,
  showCrosshair = true,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onImageLoad,
  onImageError,
}) => {
  const overlayMode = useMemo(() => {
    return viewportPosition === "overlay";
  }, [viewportPosition]);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isZoomImageLoaded, setIsZoomImageLoaded] = useState(false);

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      if (imageRef.current) {
        const dimensions = getImageDimensions(imageRef.current);
        setImageDimensions(dimensions);
        setIsImageLoaded(true);
      }
      onImageLoad?.(event);
    },
    [onImageLoad],
  );

  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setIsImageLoaded(false);
      onImageError?.(event);
    },
    [onImageError],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !isImageLoaded) return;

      const position = getMousePosition(event, containerRef.current);
      setMousePosition(position);
      onMouseMove?.(event, position);
    },
    [isImageLoaded, onMouseMove],
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(true);
      onMouseEnter?.(event);
    },
    [onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(false);
      onMouseLeave?.(event);
    },
    [onMouseLeave],
  );

  // Preload high-res zoom image
  useEffect(() => {
    if (!zoomSrc) {
      setIsZoomImageLoaded(false);
      return;
    }

    setIsZoomImageLoaded(false);
    const img = new Image();

    img.onload = () => {
      setIsZoomImageLoaded(true);
    };

    img.onerror = () => {
      setIsZoomImageLoaded(false);
    };

    img.src = zoomSrc;
  }, [zoomSrc]);

  // Calculate effective lens size - clamp to image dimensions in non-overlay mode
  const effectiveLensSize = React.useMemo(() => {
    if (overlayMode) {
      return lensSize;
    }
    // In non-overlay mode, clamp lens size to fit within image
    return Math.min(
      lensSize,
      Math.min(imageDimensions.width, imageDimensions.height),
    );
  }, [lensSize, imageDimensions, overlayMode]);

  // Calculate lens position - clamp lens to stay within image bounds while allowing mouse to reach edges
  const lensPosition = React.useMemo(() => {
    const halfLens = effectiveLensSize / 2;
    return {
      x: clamp(mousePosition.x, halfLens, imageDimensions.width - halfLens),
      y: clamp(mousePosition.y, halfLens, imageDimensions.height - halfLens),
    };
  }, [mousePosition, effectiveLensSize, imageDimensions]);

  // Calculate viewport position based on viewportPosition prop or overlay mode
  const viewportStyles = React.useMemo(() => {
    if (!isImageLoaded) return {};

    const styles: React.CSSProperties = {
      width: overlayMode ? lensSize : viewportWidth,
      height: overlayMode ? lensSize : viewportHeight,
    };

    if (overlayMode) {
      // If lens is bigger than image, center it on the image
      if (
        lensSize >= imageDimensions.width ||
        lensSize >= imageDimensions.height
      ) {
        styles.left = Math.min(0, (imageDimensions.width - lensSize) / 2);
        styles.top = Math.max(0, (imageDimensions.height - lensSize) / 2);
      } else {
        // Position viewport centered on mouse cursor, but keep within container bounds
        const halfLens = lensSize / 2;

        // Calculate position relative to container, keeping viewport within bounds
        const left = Math.min(
          Math.max(mousePosition.x - halfLens, 0),
          imageDimensions.width - lensSize,
        );
        const top = Math.min(
          Math.max(mousePosition.y - halfLens, 0),
          imageDimensions.height - lensSize,
        );

        styles.left = left;
        styles.top = top;
      }
    } else {
      switch (viewportPosition) {
        case "right":
          styles.left = imageDimensions.width + viewportOffset;
          styles.top = 0;
          break;
        case "left":
          styles.right = imageDimensions.width + viewportOffset;
          styles.top = 0;
          break;
        case "bottom":
          styles.top = imageDimensions.height + viewportOffset;
          styles.left = 0;
          break;
        case "top":
          styles.bottom = imageDimensions.height + viewportOffset;
          styles.left = 0;
          break;
      }
    }

    return styles;
  }, [
    viewportPosition,
    imageDimensions,
    viewportWidth,
    viewportHeight,
    viewportOffset,
    overlayMode,
    mousePosition,
    isImageLoaded,
    lensSize,
  ]);

  // Calculate zoomed image position and scale
  const zoomedImageStyles = React.useMemo(() => {
    if (!isImageLoaded) return {};

    // Clamp mouse position to image bounds for background positioning
    const clampedMouseX = clamp(mousePosition.x, 0, imageDimensions.width);
    const clampedMouseY = clamp(mousePosition.y, 0, imageDimensions.height);

    // Scale factor for the zoomed image
    const scale = zoomFactor;

    // Position the zoomed image so that the mouse position appears centered in viewport
    const currentViewportWidth = overlayMode ? lensSize : viewportWidth;
    const currentViewportHeight = overlayMode ? lensSize : viewportHeight;
    const translateX = -(clampedMouseX * scale) + currentViewportWidth / 2;
    const translateY = -(clampedMouseY * scale) + currentViewportHeight / 2;

    return {
      width: imageDimensions.width * scale,
      height: imageDimensions.height * scale,
      transform: `translate(${translateX}px, ${translateY}px)`,
    };
  }, [
    mousePosition,
    zoomFactor,
    imageDimensions,
    viewportWidth,
    viewportHeight,
    isImageLoaded,
    overlayMode,
    lensSize,
  ]);

  // Set CSS custom properties
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.setProperty(
        "--image-zoomer-zoom-factor",
        zoomFactor.toString(),
      );
      container.style.setProperty(
        "--image-zoomer-lens-size",
        `${effectiveLensSize}px`,
      );
      console.log(containerRef);
    }
    console.log("no container ref");
  }, [zoomFactor, effectiveLensSize]);

  // Determine which image source to use for zoom
  const zoomImageSrc = zoomSrc && isZoomImageLoaded ? zoomSrc : src;

  const containerClasses = [
    "image-zoomer",
    zoom && isImageLoaded ? "image-zoomer--zooming" : "",
    overlayMode ? "image-zoomer--overlay" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="image-zoomer__image"
        onLoad={handleImageLoad}
        onError={handleImageError}
        draggable={false}
      />

      {zoom && isImageLoaded && (!overlayMode || isHovering) && (
        <>
          {/* Crosshair */}
          {showCrosshair && (
            <div
              className="image-zoomer__crosshair"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            />
          )}

          {/* Zoom Lens */}
          {!overlayMode && (
            <div
              className="image-zoomer__lens"
              style={{
                left: lensPosition.x,
                top: lensPosition.y,
                width: effectiveLensSize,
                height: effectiveLensSize,
              }}
            />
          )}

          {/* Zoom Viewport */}
          <div className="image-zoomer__viewport" style={viewportStyles}>
            <img
              className="image-zoomer__zoomed-image"
              src={zoomImageSrc}
              alt=""
              draggable={false}
              style={zoomedImageStyles}
            />
          </div>
        </>
      )}
    </div>
  );
};

ImageZoomer.displayName = "ImageZoomer";
