import React from "react";

export default function VideoTest() {
  return (
    <div style={{ background: "#000", padding: 40 }}>
      <video
        src="https://thoughtful-art-58d6f8e379.media.strapiapp.com/IMG_1499_217c43bb9a.mp4"
        controls
        width="800"
        height="450"
        style={{ borderRadius: "1rem", background: "#000", width: "100%", height: "450px" }}
      >
        <source src="https://thoughtful-art-58d6f8e379.media.strapiapp.com/IMG_1499_217c43bb9a.mp4" type="video/mp4" />
        Tarayıcınız bu videoyu desteklemiyor.
      </video>
    </div>
  );
}
