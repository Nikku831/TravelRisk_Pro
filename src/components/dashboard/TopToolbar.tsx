import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ClockIcon, MapPinIcon, Navigation } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TopToolbarProps {
  onGenerateForecast: () => void;
  loading: boolean;
  startLocation: string;
  endLocation: string;
  onStartLocationChange: (location: string) => void;
  onEndLocationChange: (location: string) => void;
}

export function TopToolbar({ onGenerateForecast, loading, startLocation, endLocation, onStartLocationChange, onEndLocationChange }: TopToolbarProps) {
  return (
    <Card className="p-6 border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg rounded-2xl">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Origin & Destination */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
          <div className="relative flex-1">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="From: Enter origin city"
              className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
              value={startLocation}
              onChange={(e) => onStartLocationChange(e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="To: Enter destination city"
              className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
              value={endLocation}
              onChange={(e) => onEndLocationChange(e.target.value)}
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="date"
              className="pl-10 h-12 w-40 rounded-xl border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
              defaultValue="2024-12-25"
            />
          </div>
          <div className="relative">
            <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="time"
              className="pl-10 h-12 w-32 rounded-xl border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
              defaultValue="08:00"
            />
          </div>
          <Select defaultValue="est">
            <SelectTrigger className="h-12 w-24 rounded-xl border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="est">EST</SelectItem>
              <SelectItem value="cst">CST</SelectItem>
              <SelectItem value="mst">MST</SelectItem>
              <SelectItem value="pst">PST</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Button */}
        <Button
          onClick={onGenerateForecast}
          disabled={loading}
          className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {loading ? 'Analyzing...' : 'Generate Forecast & Risk'}
        </Button>
      </div>
    </Card>
  );
}