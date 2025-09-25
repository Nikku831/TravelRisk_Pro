import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Route, Clock, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface RouteOption {
  id: string;
  name: string;
  distance: string;
  duration: string;
  risk: 'low' | 'moderate' | 'high';
  color: string;
  selected: boolean;
}

const routes: RouteOption[] = [
  {
    id: '1',
    name: 'Interstate Route (I-95)',
    distance: '215 miles',
    duration: '3h 45m',
    risk: 'low',
    color: '#10b981',
    selected: true,
  },
  {
    id: '2',
    name: 'Scenic Coastal Route',
    distance: '242 miles',
    duration: '4h 20m',
    risk: 'moderate',
    color: '#f59e0b',
    selected: false,
  },
  {
    id: '3',
    name: 'Mountain Pass Route',
    distance: '198 miles',
    duration: '4h 15m',
    risk: 'high',
    color: '#ef4444',
    selected: false,
  },
];



function interpolate(start: [number, number], end: [number, number], t: number): [number, number] {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t
  ];
}

function generateRouteCoords(routeId: string, startCoords: [number, number], endCoords: [number, number]): [number, number][] {
  const numPoints = 5;
  const coords: [number, number][] = [startCoords];

  switch (routeId) {
    case '1': // Interstate - straight
      for (let i = 1; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        coords.push(interpolate(startCoords, endCoords, t));
      }
      break;
    case '2': // Coastal - slight east deviation
      for (let i = 1; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        const deviation = 0.5 * Math.sin(t * Math.PI); // Curve east
        const lat = startCoords[0] + (endCoords[0] - startCoords[0]) * t;
        const lng = startCoords[1] + (endCoords[1] - startCoords[1]) * t + deviation;
        coords.push([lat, lng]);
      }
      break;
    case '3': // Mountain - slight west deviation
      for (let i = 1; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        const deviation = -0.5 * Math.sin(t * Math.PI); // Curve west
        const lat = startCoords[0] + (endCoords[0] - startCoords[0]) * t;
        const lng = startCoords[1] + (endCoords[1] - startCoords[1]) * t + deviation;
        coords.push([lat, lng]);
      }
      break;
    default:
      for (let i = 1; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        coords.push(interpolate(startCoords, endCoords, t));
      }
  }

  coords.push(endCoords);
  return coords;
}

interface RouteMapProps {
  startCoords: [number, number];
  endCoords: [number, number];
}

function FitBounds({ startCoords, endCoords }: { startCoords: [number, number]; endCoords: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    const bounds = new LatLngBounds([startCoords, endCoords]);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, startCoords, endCoords]);

  return null;
}

export function RouteMap({ startCoords, endCoords }: RouteMapProps) {
  const [selectedRoute, setSelectedRoute] = useState('1');

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'default';
      case 'moderate':
        return 'secondary';
      case 'high':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5 text-blue-500" />
          Interactive Route Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Map Visualization */}
        <div className="h-80 rounded-lg mx-6 mb-6">
          <MapContainer
            center={[(startCoords[0] + endCoords[0]) / 2, (startCoords[1] + endCoords[1]) / 2]}
            zoom={7}
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FitBounds startCoords={startCoords} endCoords={endCoords} />
            {/* Start Marker */}
            <Marker position={startCoords}>
              <Popup>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  Start Location
                </div>
              </Popup>
            </Marker>
            {/* End Marker */}
            <Marker position={endCoords}>
              <Popup>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  End Location
                </div>
              </Popup>
            </Marker>
            {/* Route Polylines */}
            {routes.map((route) => {
              const coords = generateRouteCoords(route.id, startCoords, endCoords);
              return (
                <Polyline
                  key={route.id}
                  positions={coords}
                  color={route.color}
                  weight={4}
                  opacity={selectedRoute === route.id ? 1 : 0.6}
                  dashArray={selectedRoute === route.id ? undefined : '10 5'}
                  eventHandlers={{
                    click: () => setSelectedRoute(route.id),
                  }}
                >
                  <Popup>
                    <div>
                      <h4 className="font-medium">{route.name}</h4>
                      <p className="text-sm text-gray-600">{route.distance} • {route.duration}</p>
                      <Badge variant={getRiskBadgeVariant(route.risk)} className="mt-2">
                        {getRiskIcon(route.risk)}
                        {route.risk} risk
                      </Badge>
                    </div>
                  </Popup>
                </Polyline>
              );
            })}
          </MapContainer>
        </div>

        {/* Route Options */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold mb-4">Route Options</h3>
          <div className="space-y-3">
            {routes.map((route) => (
              <div
                key={route.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedRoute === route.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: route.color }}
                    />
                    <div>
                      <h4 className="font-medium">{route.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>{route.distance}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {route.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRiskBadgeVariant(route.risk)} className="text-xs">
                      {getRiskIcon(route.risk)}
                      {route.risk} risk
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}