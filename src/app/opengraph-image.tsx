import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.businessName}: Numerology & Astrology Readings`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Placeholder social share image; replace with final artwork in Phase 5. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 70% 20%, #2a2f66 0%, #0a0c24 45%, #05061a 100%)",
          color: "#f6eedd",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", width: 140, height: 140, borderRadius: 999, border: "2px solid #d9b66c", alignItems: "center", justifyContent: "center", fontSize: 72, color: "#d9b66c" }}>
          ✦
        </div>
        <div style={{ marginTop: 40, fontSize: 76 }}>{site.businessName}</div>
        <div style={{ marginTop: 16, fontSize: 34, color: "#d9b66c", letterSpacing: 6 }}>NUMEROLOGY · ASTROLOGY</div>
      </div>
    ),
    size,
  );
}
