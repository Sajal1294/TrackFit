import { useEffect, useRef } from "react";

export default function LiveMap({ coordinates }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx || coordinates.length < 2) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);

    for (let i = 1; i < coordinates.length; i++) {
      ctx.lineTo(coordinates[i].x, coordinates[i].y);
    }

    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [coordinates]);

  return <canvas ref={canvasRef} width={400} height={400} />;
}
