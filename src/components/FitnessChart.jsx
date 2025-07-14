import React, { useRef, useEffect } from 'react';
import './FitnessChart.css';

const FitnessChart = ({ data }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const barWidth = 40;
    const spacing = 30;
    const max = Math.max(...data, 100); // fallback max
    const scale = (height - 50) / max;

    data.forEach((val, i) => {
      const x = i * (barWidth + spacing) + spacing;
      const barHeight = val * scale;
      const y = height - barHeight - 30;

      // Gradient bar style
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, '#66ffcc');
      gradient.addColorStop(1, '#3399ff');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(x, y + 5);
      ctx.lineTo(x, y + barHeight);
      ctx.arcTo(x, y + barHeight, x + barWidth, y + barHeight, 10);
      ctx.lineTo(x + barWidth, y + barHeight);
      ctx.lineTo(x + barWidth, y + 5);
      ctx.arcTo(x + barWidth, y, x, y, 10);
      ctx.closePath();
      ctx.fill();

      // Bar label
      ctx.fillStyle = '#222';
      ctx.font = '13px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${val} kcal`, x + barWidth / 2, y - 8);
    });

    // X-axis line
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();
  }, [data]);

  return (
    <div className="fitness-chart-container">
      <canvas ref={canvasRef} width={700} height={300} />
    </div>
  );
};

export default FitnessChart;
