import React, { useEffect, useRef } from 'react';

export const AnimatedCryptoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for high tech mining mesh
    const nodeCount = Math.min(Math.floor((width * height) / 16000), 70);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(245, 158, 11, 0.85)',  // Amber Gold
      'rgba(16, 185, 129, 0.85)',  // Emerald Green
      'rgba(6, 182, 212, 0.85)',   // Cyan Blue
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = (1 - dist / 140) * 0.35;
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Render and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070A10]">
      {/* Dynamic Animated Ambient Mesh Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-cyan-500/25 rounded-full blur-[140px] animate-float"></div>
      <div className="absolute top-[35%] right-[-10%] w-[750px] h-[750px] bg-amber-500/25 rounded-full blur-[160px] animate-float-reverse"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-emerald-500/25 rounded-full blur-[150px] animate-float"></div>

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>

      {/* Sweeping Cyan Scanning Laser */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_20px_#06b6d4] animate-scanline"></div>

      {/* HTML5 Canvas Live Nodes Network Animation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />
    </div>
  );
};
