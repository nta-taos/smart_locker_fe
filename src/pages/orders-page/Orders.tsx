import { useTranslation } from 'react-i18next';

import { ClearOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Tabs } from 'antd';
import dayjs from 'dayjs';

import styles from './Orders.module.scss';
import { useOrders } from './useOrders';

export const OrdersPage = () => {
  const { tabItems, codeFilter, dateRange, setFilters } = useOrders();
  const { t } = useTranslation(['orders', 'common']);

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

    const from = newRange[0];
    const to = newRange[1];

    if (from && to && dayjs(from).isAfter(dayjs(to))) {
      if (index === 0) {
        newRange[1] = from;
      } else {
        newRange[0] = to;
      }
    }

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
                placeholder={t('orders:searchPlaceholder')}
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
                placeholder={t('common:time.from')}
                onChange={(v) => handleRangeChange(0, v)}
                value={dateRange?.[0] ? dayjs(dateRange[0]) : undefined}
                style={{ width: '100%' }}
                size="large"
                disabledDate={(current) => {
                  if (!current) return false;
                  const today = dayjs().endOf('day');
                  return current > today;
                }}
              />
            </Col>

            <Col xs={12} md={4}>
              <DatePicker
                placeholder={t('common:time.to')}
                onChange={(v) => handleRangeChange(1, v)}
                value={dateRange?.[1] ? dayjs(dateRange[1]) : undefined}
                style={{ width: '100%' }}
                size="large"
                disabledDate={(current) => {
                  if (!current) return false;
                  const today = dayjs().endOf('day');
                  if (current > today) return true;
                  if (dateRange?.[0]) {
                    return current < dayjs(dateRange[0]).startOf('day');
                  }
                  return false;
                }}
              />
            </Col>

            <Col xs={24} md={2}>
              <Button icon={<ClearOutlined />} type="primary" block onClick={handleClear}>
                {t('filters.clear')}
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
