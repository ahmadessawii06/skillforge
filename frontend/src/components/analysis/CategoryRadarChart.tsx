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

interface CategoryRadarChartProps {
  categoryScores: CategoryScore[];
}

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
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderColor: '#6366f1',
        borderWidth: 2.5,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
      {
        label: 'Target (80%)',
        data: categoryScores.map(() => 80),
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderColor: 'rgba(16, 185, 129, 0.4)',
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
          color: '#94a3b8',
          backdropColor: 'transparent',
        },
        pointLabels: {
          font: { size: 12, weight: 600 as const },
          color: '#334155',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.15)',
        },
        angleLines: {
          color: 'rgba(148, 163, 184, 0.12)',
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
          color: '#64748b',
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
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
    <div className="analysis-card analysis-chart-card h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="analysis-chart-title mb-1">Category Analysis</h2>
            <p className="analysis-chart-subtitle mb-0">Performance across all categories</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#6366f1' }}>
              insights
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Radar ref={chartRef} data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
