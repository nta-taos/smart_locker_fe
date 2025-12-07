import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';

import {
  AimOutlined,
  LoginOutlined,
  RiseOutlined,
  SearchOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, Input } from 'antd';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import LocationSvg from '../common/icon/LocationSvg';
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

function MapFocus({
  position,
  selectedBuildingId,
}: {
  position: LatLngExpression | null;
  selectedBuildingId: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedBuildingId || !position) return;

    map.flyTo(position, 16, {
      duration: 0.6,
    });
  }, [map, position, selectedBuildingId]);

  return null;
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
    searchResults,
    handleSendPackage,
    handleRentLocker,
    isDrawerOpen,
  } = useMapHook();

  const renderPopupContent = () => {
    if (!selectedBuildingId) return <div>err</div>;

    return (
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          <div className={styles.locationInfo}>
            <div className={styles.locationHeader}>
              <div className={styles.locationIcon}>
                <LocationSvg />
              </div>
              <h2 className={styles.locationTitle}>{buildingSelected?.name}</h2>
            </div>
            <p className={styles.locationAddress}>{buildingSelected?.address}</p>

            <div className={styles.badgesContainer}>
              <div className={styles.badge}>
                {!buildingSelected?.isPublic ? (
                  <>
                    <WarningOutlined className={styles.badgeIcon} />
                    <span className={styles.badgeText}>Có thể không vào được</span>
                  </>
                ) : (
                  <>
                    <LoginOutlined className={styles.badgeIcon} />
                    <span className={styles.badgeText}>Mở cửa 24/7</span>
                  </>
                )}
              </div>
              <div className={styles.badgeOutline}>
                <RiseOutlined style={{ fontSize: '18px', color: '#CCC' }} />
                <span className={styles.badgeTextOutline}>Còn trống</span>
              </div>
            </div>
          </div>

          <div className={styles.lockerStatsContainer}>
            <div className={styles.lockerStats}>
              <div className={styles.lockerStat}>
                <div className={styles.lockerNumber}>{countSlot[0] || 0}</div>
                <div className={styles.lockerLabel}>SIZE S</div>
              </div>
              <div className={styles.lockerStat}>
                <div className={styles.lockerNumber}>{countSlot[1] || 0}</div>
                <div className={styles.lockerLabel}>SIZE M</div>
              </div>
              <div className={styles.lockerStat}>
                <div className={styles.lockerNumber}>{countSlot[2] || 0}</div>
                <div className={styles.lockerLabel}>SIZE L</div>
              </div>
              <div className={styles.lockerStat}>
                <div className={styles.lockerNumber}>{countSlot[3] || 0}</div>
                <div className={styles.lockerLabel}>SIZE XL</div>
              </div>
            </div>
          </div>
        </div>
        <Divider style={{ margin: '16px 0', borderColor: '#e5e5e5' }} />

        <div className={styles.actionButtons}>
          <Button
            type="primary"
            className={styles.rentButton}
            size="large"
            onClick={handleRentLocker}
          >
            Thuê tủ
          </Button>
          <Button
            type="primary"
            className={styles.rentButton}
            size="large"
            onClick={handleSendPackage}
          >
            Gửi hàng
          </Button>
        </div>
      </div>
    );
  };

  const renderSearchBar = () => {
    return (
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <Input
            value={searchInput}
            style={{ borderRadius: '6px' }}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm kiếm tủ gần bạn"
            allowClear
            size="middle"
            prefix={<SearchOutlined style={{ color: '#999' }} />}
          />
        </div>
        {searchInput.trim() && searchResults.length > 0 && (
          <div className={styles.searchResults}>
            {searchResults.map((b) => (
              <button
                key={b.id}
                type="button"
                className={styles.searchResultItem}
                onClick={() => {
                  setSelectedBuildingId(b.id);
                  setSearchInput(b.name);
                }}
              >
                <div className={styles.searchResultName}>{b.name}</div>
                <div className={styles.searchResultAddress}>{b.address}</div>
              </button>
            ))}
          </div>
        )}
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
        <MapFocus
          position={
            selectedBuildingId && buildingSelected
              ? ([buildingSelected.latitude, buildingSelected.longitude] as LatLngExpression)
              : null
          }
          selectedBuildingId={selectedBuildingId}
        />

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
        open={isDrawerOpen}
        className={styles.lockerPopup}
        height={'auto'}
      >
        {renderPopupContent()}
      </Drawer>
    </div>
  );
};

export default MapView;
