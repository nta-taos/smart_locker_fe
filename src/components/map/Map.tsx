import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet';

import { AimOutlined } from '@ant-design/icons';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const userIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [32, 32],
});

function LocateButton({ onLocate }: { onLocate: (pos: LatLngExpression) => void }) {
  const map = useMap();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
          map.setView(coords, 15);
          onLocate(coords);
        },
        (err) => {
          console.error('Lỗi lấy vị trí:', err);
          alert('Không thể lấy vị trí của bạn!');
        },
      );
    } else {
      alert('Trình duyệt không hỗ trợ Geolocation!');
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '6px 8px',
        cursor: 'pointer',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }}
    >
      <AimOutlined style={{ fontSize: '18px', color: '#333' }} />
    </button>
  );
}

export default function MapView() {
  const [userPos, setUserPos] = useState<LatLngExpression | null>(null);

  return (
    <MapContainer
      center={[16.047079, 108.20623]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* display location user */}
      {userPos && (
        <Marker position={userPos} icon={userIcon}>
          <Popup>Bạn đang ở đây 🚶</Popup>
        </Marker>
      )}

      <ZoomControl position="bottomright" />
      <div style={{ position: 'absolute', bottom: '100px', right: '10px', zIndex: 1000 }}>
        <LocateButton onLocate={setUserPos} />
      </div>
    </MapContainer>
  );
}
