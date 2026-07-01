import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A1628",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark — rendered as styled text since edge runtime can't load local images */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: "900",
            color: "#FFFFFF",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          AVM
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#94A3B8",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginTop: "16px",
          }}
        >
          Healthcare Products Pvt. Ltd.
        </div>
        <div
          style={{
            width: "60px",
            height: "2px",
            background: "#2563EB",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "48px",
            fontStyle: "italic",
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Precision Surgical Instruments
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#94A3B8",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginTop: "24px",
          }}
        >
          Made in India · Since 1996
        </div>
      </div>
    ),
    { ...size }
  );
}
