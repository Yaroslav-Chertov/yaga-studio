import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          color: "#fff4ed",
          background:
            "linear-gradient(180deg, #8b7496 0%, #7e6989 48%, #6c5876 100%)",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-80px",
            width: "440px",
            height: "440px",
            borderRadius: "999px",
            background: "rgba(255, 244, 237, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "60px",
            bottom: "-180px",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            background: "rgba(255, 106, 61, 0.14)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 26,
            textTransform: "uppercase",
            letterSpacing: "0.26em",
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: 48,
              height: 1,
              background: "rgba(255,244,237,0.8)",
            }}
          />
          YAGA Studio
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "820px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              lineHeight: 0.92,
              fontWeight: 800,
              letterSpacing: "-0.07em",
            }}
          >
            Брендинг,
            <br />
            интерфейсы и разработка
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.45,
              maxWidth: "760px",
              color: "rgba(255,244,237,0.88)",
            }}
          >
            Для бизнеса, которому важны вкус, цельность и сильная цифровая
            подача.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "22px",
              fontSize: 22,
              color: "rgba(255,244,237,0.82)",
            }}
          >
            <span>кейсы</span>
            <span>услуги</span>
            <span>web</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "14px 22px",
              borderRadius: 999,
              background: "#fff4ed",
              color: "#251a2c",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            yaga.studio
          </div>
        </div>
      </div>
    ),
    size,
  );
}
