import { ClearOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Tabs } from 'antd';
import dayjs from 'dayjs';

import styles from './Orders.module.scss';
import { useOrders } from './useOrders';

export const OrdersPage = () => {
  const { tabItems, codeFilter, dateRange, setFilters } = useOrders();

  const handleSearchCode = (value: string) => {
    setFilters({
      code: value.trim() || undefined,
      from: dateRange?.[0],
      to: dateRange?.[1],
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRangeChange = (index: 0 | 1, value: any) => {
    const newRange: [string?, string?] = [...(dateRange || [])];
    newRange[index] = value ? dayjs(value).format('YYYY-MM-DD') : undefined;

    setFilters({
      code: codeFilter,
      from: newRange[0],
      to: newRange[1],
    });
  };

  const handleClear = () => {
    setFilters({
      code: undefined,
      from: undefined,
      to: undefined,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.filterBar}>
          <Row gutter={[8, 8]}>
            <Col xs={24} md={14}>
              <Input.Search
                placeholder="Tìm theo mã đơn hàng"
                allowClear
                enterButton
                onSearch={handleSearchCode}
                value={codeFilter}
                onChange={(e) => handleSearchCode(e.target.value)}
                size="large"
              />
            </Col>

            <Col xs={12} md={4}>
              <DatePicker
                placeholder="Từ ngày"
                onChange={(v) => handleRangeChange(0, v)}
                value={dateRange?.[0] ? dayjs(dateRange[0]) : undefined}
                style={{ width: '100%' }}
                size="large"
              />
            </Col>

            <Col xs={12} md={4}>
              <DatePicker
                placeholder="Đến ngày"
                onChange={(v) => handleRangeChange(1, v)}
                value={dateRange?.[1] ? dayjs(dateRange[1]) : undefined}
                style={{ width: '100%' }}
                size="large"
              />
            </Col>

            <Col xs={24} md={2}>
              <Button icon={<ClearOutlined />} type="primary" block onClick={handleClear}>
                Xóa
              </Button>
            </Col>
          </Row>
        </div>

        <div className={styles.tabContainer}>
          <Tabs centered defaultActiveKey="1" items={tabItems} />
        </div>
      </div>
    </div>
  );
};
