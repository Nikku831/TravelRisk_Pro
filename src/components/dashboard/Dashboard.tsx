import { useState, useEffect, useRef } from 'react';
import { TopToolbar } from './TopToolbar';
import { WeatherCharts } from './WeatherCharts';
import { RouteMap } from './RouteMap';
import { RiskAnalysis } from './RiskAnalysis';
import { SummaryCards } from './SummaryCards';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { cities } from '@/lib/cities';

interface DashboardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Dashboard({ darkMode, toggleDarkMode }: DashboardProps) {
  const [loading, setLoading] = useState(false);
  const [startLocation, setStartLocation] = useState('New York, NY');
  const [endLocation, setEndLocation] = useState('Boston, MA');
  const [startCoords, setStartCoords] = useState<[number, number]>([40.7128, -74.0060]);
  const [endCoords, setEndCoords] = useState<[number, number]>([42.3601, -71.0589]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCoords = async (location: string): Promise<[number, number] | null> => {
    if (cities[location]) {
      return cities[location];
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1&addressdetails=1`, {
        headers: {
          'User-Agent': 'TravelRiskPro/1.0'
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        return [lat, lon];
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(async () => {
      const start = await fetchCoords(startLocation);
      if (start) setStartCoords(start);

      const end = await fetchCoords(endLocation);
      if (end) setEndCoords(end);
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startLocation, endLocation]);

  const handleGenerateForecast = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                TravelRisk Pro
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full w-10 h-10 p-0"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Toolbar */}
        <div className="mb-8">
          <TopToolbar 
            onGenerateForecast={handleGenerateForecast} 
            loading={loading}
            startLocation={startLocation}
            endLocation={endLocation}
            onStartLocationChange={setStartLocation}
            onEndLocationChange={setEndLocation}
          />
        </div>

        {/* Main Three-Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
          {/* Left Column - Weather Charts */}
          <div className="xl:col-span-3">
            <WeatherCharts />
          </div>

          {/* Center Column - Route Map */}
          <div className="xl:col-span-6">
            <RouteMap
              startCoords={startCoords}
              endCoords={endCoords}
            />
          </div>

          {/* Right Column - Risk Analysis */}
          <div className="xl:col-span-3">
            <RiskAnalysis />
          </div>
        </div>

        {/* Bottom Section - Summary Cards */}
        <SummaryCards />
      </div>
    </div>
  );
}