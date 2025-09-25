import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, CloudRain, Wind } from 'lucide-react';

const weatherData = [
  { time: '06:00', temperature: 18, rainfall: 0, windSpeed: 12, tempMin: 16, tempMax: 20 },
  { time: '09:00', temperature: 22, rainfall: 0, windSpeed: 15, tempMin: 20, tempMax: 24 },
  { time: '12:00', temperature: 26, rainfall: 2, windSpeed: 18, tempMin: 24, tempMax: 28 },
  { time: '15:00', temperature: 24, rainfall: 8, windSpeed: 22, tempMin: 22, tempMax: 26 },
  { time: '18:00', temperature: 20, rainfall: 12, windSpeed: 25, tempMin: 18, tempMax: 22 },
  { time: '21:00', temperature: 17, rainfall: 5, windSpeed: 20, tempMin: 15, tempMax: 19 },
];

function ChartCard({ title, children, icon, description }: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="h-80">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-60">
        {children}
      </CardContent>
    </Card>
  );
}

export function WeatherCharts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Forecasts</h2>
      </div>

      <ChartCard
        title="Temperature"
        icon={<Thermometer className="h-5 w-5 text-orange-500" />}
        description="Temperature forecast with confidence intervals"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value, name) => [`${value}°C`, name]}
            />
            <Area
              dataKey="tempMax"
              stackId="1"
              stroke="none"
              fill="rgba(249, 115, 22, 0.1)"
            />
            <Area
              dataKey="tempMin"
              stackId="1"
              stroke="none"
              fill="rgba(249, 115, 22, 0.1)"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Rainfall"
        icon={<CloudRain className="h-5 w-5 text-blue-500" />}
        description="Precipitation forecast along the route"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value, name) => [`${value}mm`, name]}
            />
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Wind Speed"
        icon={<Wind className="h-5 w-5 text-teal-500" />}
        description="Wind conditions throughout the journey"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value, name) => [`${value} km/h`, name]}
            />
            <Line
              type="monotone"
              dataKey="windSpeed"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#14b8a6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}