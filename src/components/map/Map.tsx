import React, { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';

import { AimOutlined, SearchOutlined, SettingOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import LocationSvg from '../common/icon/LocationSvg';
import { LockerItem } from '../common/locker-item/LockerItem';
import { BuildingMarker, UserMarker } from '../common/marker';
import styles from './Map.module.scss';
import useMapHook from './useMap';

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

interface MapViewProps {
  className?: string;
  varriant?: 'detail' | 'shorten';
}

const MapView: React.FC<MapViewProps> = ({ className = '', varriant = 'shorten' }) => {
  const isShowDetail = varriant == 'detail';
  const classes = [styles.container, className].filter(Boolean).join(' ');
  const [userPos, setUserPos] = useState<LatLngExpression | null>(null);

  const {
    countSlot,
    buildingSelected,
    selectedBuildingId,
    setSelectedBuildingId,
    searchInput,
    setSearchInput,
    buildingIds,
    handleSubmitButton,
  } = useMapHook();

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
          <Button type="primary" className={styles.desktopButton} onClick={handleSubmitButton}>
            Thuê tủ ngay
          </Button>
        </div>
        <div className={styles.lockerContainer}>
          <LockerItem num={countSlot[0]} size={0} />
          <LockerItem num={countSlot[1]} size={1} />
          <LockerItem num={countSlot[2]} size={2} />
          <Button type="primary" className={styles.mobileButton} onClick={handleSubmitButton}>
            Thuê tủ ngay
          </Button>
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

        {userPos && <UserMarker position={userPos} />}

        {buildingIds.map((id) => (
          <BuildingMarker
            key={id}
            id={id}
            isSelected={selectedBuildingId == id}
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
        height={'auto'}
      >
        {renderPopupContent()}
      </Drawer>
    </div>
  );
};

export default MapView;
