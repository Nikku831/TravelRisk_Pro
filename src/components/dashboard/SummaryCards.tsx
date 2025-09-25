import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Route, Cloud, Sun, CloudRain, Clock, MapPin, Thermometer, Wind } from 'lucide-react';

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Route Summary Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5 text-blue-600" />
            Route Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Distance</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                215 <span className="text-sm font-normal text-gray-500">miles</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <span>Travel Time</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  3h 45m
                </div>
                <div className="text-sm text-gray-500">± 25 minutes</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Risk Level</span>
              <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200">
                Low Risk
              </Badge>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Recommended Route</div>
              <div className="font-semibold text-gray-900 dark:text-white">Interstate I-95 North</div>
              <div className="text-sm text-gray-500">Fastest route with minimal weather impact</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Summary Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-orange-600" />
            Weather Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Forecast Confidence</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">87%</div>
                <div className="text-sm text-gray-500">High confidence</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm font-medium">Morning</div>
                <div className="text-xs text-gray-500">Clear</div>
              </div>
              <div className="text-center">
                <Cloud className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium">Midday</div>
                <div className="text-xs text-gray-500">Cloudy</div>
              </div>
              <div className="text-center">
                <CloudRain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-medium">Evening</div>
                <div className="text-xs text-gray-500">Light Rain</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span>Temperature Range</span>
                </div>
                <span className="font-semibold">17°C - 26°C</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span>Max Precipitation</span>
                </div>
                <span className="font-semibold">12mm</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-teal-500" />
                  <span>Max Wind Speed</span>
                </div>
                <span className="font-semibold">25 km/h</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}