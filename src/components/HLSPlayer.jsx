import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const HLSPlayer = (props) => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const player = new Plyr("video");

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(props.src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = props.src;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    }
  }, [props.src]);

  return (
    <div ref={videoContainerRef} className="video-container">
      <video ref={videoRef} controls />
    </div>
  );
};

export default HLSPlayer;
