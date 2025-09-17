import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet';

import { AimOutlined, SearchOutlined, SettingOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { Icon, LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useBuildingStateById } from '@/recoil/atom/building.atom';

import LocationSvg from '../common/icon/LocationSvg';
import { LockerItem } from '../common/locker-item/LockerItem';
import styles from './Map.module.scss';
import useMapHook from './useMap';

const userIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [32, 32],
});

const buildingIcon = (type: 'nomal' | 'danger' | 'success') => {
  let color = 'blue';
  if (type == 'danger') {
    color = 'red';
  }
  if (type == 'success') {
    color = 'green';
  }

  return L.divIcon({
    className: '',
    html: `
    <svg width="138" height="116" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M61 1c11.046 0 20 8.611 20 19.233 0 6.325-3.176 11.937-8.077 15.442-3.76 2.717-9.125 7.02-10.371 13.972-.128.714-.7 1.278-1.408 1.346L61 51c-.775 0-1.415-.591-1.552-1.353-1.25-6.968-6.635-11.274-10.396-13.99C44.165 32.15 41 26.546 41 20.232 41 9.611 49.954 1 61 1Z" fill="${color}"/><path d="M61 1V.5 1Zm20 19.233h.5-.5Zm-8.077 15.442-.291-.407-.002.002.293.405ZM62.552 49.647l-.492-.089.492.089Zm-1.408 1.346.023.5.012-.001.012-.001-.047-.498ZM61 51v.5h.024L61 51Zm-1.552-1.353.492-.089-.492.089Zm-10.396-13.99.292-.406v-.001l-.292.406ZM41 20.232h-.5.5ZM61 1v.5c10.788 0 19.5 8.406 19.5 18.733h1C81.5 9.317 72.303.5 61 .5V1Zm20 19.233h-.5c0 6.152-3.088 11.617-7.868 15.035l.29.407.292.407c5.022-3.593 8.286-9.35 8.286-15.849H81Zm-8.077 15.442-.293-.405c-3.762 2.718-9.286 7.123-10.57 14.288l.492.089.492.088c1.208-6.739 6.414-10.939 10.172-13.655l-.293-.405ZM62.552 49.647l-.492-.089c-.093.514-.498.893-.964.937l.048.498.047.498c.952-.091 1.689-.84 1.853-1.756l-.492-.088Zm-1.408 1.346-.024-.5-.144.008L61 51l.024.5.143-.007-.023-.5ZM61 51v-.5c-.508 0-.961-.393-1.06-.942l-.492.089-.492.088C59.131 50.71 59.96 51.5 61 51.5V51Zm-1.552-1.353.492-.089c-1.287-7.181-6.833-11.59-10.596-14.307l-.292.405-.293.406c3.76 2.715 8.986 6.919 10.197 13.673l.492-.088Zm-10.396-13.99.291-.407c-4.765-3.42-7.843-8.875-7.843-15.017h-1c0 6.487 3.253 12.236 8.26 15.83l.292-.407ZM41 20.232h.5C41.5 9.906 50.212 1.5 61 1.5v-1C49.697.5 40.5 9.317 40.5 20.233h.5Z" fill="url(#a)"/><ellipse cx="61" cy="20.804" rx="16" ry="15.843" fill="#fff"/><g filter="url(#b)"><path d="M56.677 56.912H84.18l1.82 1.25-1.819 4.167L52 63.912l4.677-7Z" fill="#000" fill-opacity=".6"/></g><path d="M62 30.889c0-.491.398-.889.889-.889h.222c.491 0 .889.398.889.889 0 .061-.05.111-.111.111H62.11a.111.111 0 0 1-.111-.111Zm-6 0c0-.491.398-.889.889-.889h.222c.491 0 .889.398.889.889 0 .061-.05.111-.111.111H56.11a.111.111 0 0 1-.111-.111Z" fill="#656565"/><rect x="53" y="11" width="14" height="19" rx="1" fill="#9C9C9C"/><rect x="53" y="10" width="14" height="1" rx=".5" fill="#fff"/><rect x="62" y="15" width="1" height="4" rx=".5" fill="#fff"/><rect x="56" y="16" width="1" height="6" rx=".5" fill="#fff"/><rect x="62" y="21" width="1" height="4" rx=".5" fill="#fff"/><defs><linearGradient id="a" x1="61" y1="1" x2="61" y2="51" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/></linearGradient><filter id="b" x="0" y="4.912" width="138" height="111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="26" result="effect1_foregroundBlur_997_9090"/></filter></defs></svg>
  `,
    iconSize: [138, 116],
    // iconAnchor: [41 / 2, 51],
  });
};

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

const BuildingMarker: React.FC<{
  id: number;
  onClick: (id: number) => void;
}> = ({ id, onClick }) => {
  const bd = useBuildingStateById(id);
  return (
    <Marker
      position={[bd.latitude, bd.longitude]}
      icon={buildingIcon('danger')}
      eventHandlers={{ click: () => onClick(id) }}
    />
  );
};

interface MapViewProps {
  className?: string;
  varriant: 'detail' | 'shorten';
}

const MapView: React.FC<MapViewProps> = ({ className = '', varriant = 'shorten' }) => {
  const isShowDetail = varriant == 'detail';
  const classes = [styles.container, className].filter(Boolean).join(' ');
  const [userPos, setUserPos] = useState<LatLngExpression | null>(null);

  const {
    buildingSelected,
    selectedBuildingId,
    setSelectedBuildingId,
    searchInput,
    setSearchInput,
    buildingIds,
  } = useMapHook();
  const lockerIds = useBuildingStateById(selectedBuildingId || 0).lockers;

  const renderPopupContent = () => {
    if (!selectedBuildingId) return <div>err</div>;

    return (
      <div>
        <div className={styles.titleContainer}>
          <LocationSvg />
          <div className={styles.title}>
            <h1>{buildingSelected?.name}</h1>
            <p>{buildingSelected?.address}</p>
          </div>
          <WifiOutlined />
          <Button type="primary">Thuê tủ ngay</Button>
        </div>
        <div className={styles.lockerContainer}>
          {lockerIds.length !== 0 && lockerIds.map((id) => <LockerItem id={id} />)}
          {lockerIds.length !== 0 && lockerIds.map((id) => <LockerItem id={id} />)}
          {lockerIds.length !== 0 && lockerIds.map((id) => <LockerItem id={id} />)}
        </div>
      </div>
    );
  };

  const renderSearchBar = () => {
    return (
      <div className={styles.searchBar}>
        <SearchOutlined />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Tìm kiếm tủ gần bạn"
        />
        <SettingOutlined />
      </div>
    );
  };

  return (
    <div className={classes}>
      <MapContainer
        center={[16.047079, 108.20623]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          // attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* display location user */}
        {userPos && (
          <Marker position={userPos} icon={userIcon}>
            <Popup>Bạn đang ở đây 🚶</Popup>
          </Marker>
        )}

        {buildingIds.map((id) => (
          <BuildingMarker
            key={id}
            id={id}
            onClick={() => {
              setSelectedBuildingId(id);
            }}
          />
        ))}

        <ZoomControl position="bottomright" />
        <div style={{ position: 'absolute', bottom: '100px', right: '10px', zIndex: 1000 }}>
          <LocateButton onLocate={setUserPos} />
        </div>
      </MapContainer>
      {isShowDetail && renderSearchBar()}
      <Drawer
        placement="bottom"
        closeIcon={false}
        onClose={() => setSelectedBuildingId(null)}
        open={selectedBuildingId != null}
        className={styles.lockerPopup}
        height={'280px'}
      >
        {renderPopupContent()}
      </Drawer>
    </div>
  );
};

export default MapView;
