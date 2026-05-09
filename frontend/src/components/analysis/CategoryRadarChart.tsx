import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { CategoryScore } from './types.ts';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function formatCategoryName(category: string): string {
  return category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryRadarChart({ categoryScores }: CategoryRadarChartProps) {
  const chartRef = useRef<ChartJS<'radar'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const labels = categoryScores.map((s) => formatCategoryName(s.category));
  const scores = categoryScores.map((s) => s.score);

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Score',
        data: scores,
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        borderColor: '#7C3AED',
        borderWidth: 2.5,
        pointBackgroundColor: '#7C3AED',
        pointBorderColor: '#1E293B',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
      {
        label: 'Target (80%)',
        data: categoryScores.map(() => 80),
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: 1.5,
        borderDash: [6, 4],
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: { size: 10 },
          color: '#71717A',
          backdropColor: 'transparent',
        },
        pointLabels: {
          font: { size: 12, weight: 600 as const },
          color: '#A1A1AA',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        angleLines: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        background: {
          color: 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 },
          color: '#A1A1AA',
        },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: { size: 13, weight: 700 as const },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 10,
        displayColors: true,
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { r: number } }) => {
            return ` ${ctx.dataset.label}: ${ctx.parsed.r}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-base font-bold text-white mb-1">Category Analysis</h2>
          <p className="text-sm text-[#71717A] mb-0">Performance across all categories</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl" style={{ color: '#7C3AED' }}>
            insights
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Radar ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
