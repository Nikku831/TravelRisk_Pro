import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';

const travelTimeData = [
  { time: '3.0-3.5h', probability: 15 },
  { time: '3.5-4.0h', probability: 35 },
  { time: '4.0-4.5h', probability: 28 },
  { time: '4.5-5.0h', probability: 15 },
  { time: '5.0-5.5h', probability: 7 },
];

interface RiskGaugeProps {
  score: number;
  title: string;
}

function RiskGauge({ score, title }: RiskGaugeProps) {
  const getColor = (score: number) => {
    if (score < 30) return '#10b981';
    if (score < 60) return '#f59e0b';
    return '#ef4444';
  };

  const getIcon = (score: number) => {
    if (score < 30) return <Shield className="h-6 w-6 text-green-500" />;
    if (score < 60) return <TrendingUp className="h-6 w-6 text-orange-500" />;
    return <AlertTriangle className="h-6 w-6 text-red-500" />;
  };

  const getLabel = (score: number) => {
    if (score < 30) return 'Low Risk';
    if (score < 60) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          {getIcon(score)}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Background Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke={getColor(score)}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getColor(score) }}>
                {score}
              </div>
              <div className="text-xs text-gray-500">/ 100</div>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {getLabel(score)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Risk Score
        </div>
      </CardContent>
    </Card>
  );
}

export function RiskAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Analysis</h2>
      </div>

      <RiskGauge score={25} title="Overall Risk" />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Travel Time Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={travelTimeData}>
                <XAxis 
                  dataKey="time" 
                  className="text-xs" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => [`${value}%`, 'Probability']}
                />
                <Bar
                  dataKey="probability"
                  fill="url(#gradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Most likely travel time: <span className="font-semibold">3.5-4.0 hours</span></p>
            <p>Confidence interval: <span className="font-semibold">3.2-4.8 hours</span></p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Weather Conditions</span>
              <span>15%</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Traffic Congestion</span>
              <span>35%</span>
            </div>
            <Progress value={35} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Road Conditions</span>
              <span>20%</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Seasonal Factors</span>
              <span>10%</span>
            </div>
            <Progress value={10} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}