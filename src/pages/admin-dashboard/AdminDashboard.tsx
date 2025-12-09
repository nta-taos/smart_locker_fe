import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  AppstoreOutlined,
  BankOutlined,
  DollarOutlined,
  InboxOutlined,
  PercentageOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Card, Col, DatePicker, Row, Spin, Statistic, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { adminApi } from '@/api/adminApi';
import { adminLoadingAtom, adminStatsAtom } from '@/recoil/atom/adminAtom';

import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const setStats = useSetRecoilState(adminStatsAtom);
  const setLoading = useSetRecoilState(adminLoadingAtom);
  const stats = useRecoilValue(adminStatsAtom);
  const loading = useRecoilValue(adminLoadingAtom);

  const fetchStats = async (date?: string) => {
    try {
      setLoading(true);
      const response = await adminApi.getDashboardStats(date);
      // API returns { status, message, data: DashboardStats }
      setStats(response.data);
    } catch (error) {
      message.error('Không thể tải thống kê dashboard');
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(selectedDate.format('YYYY-MM-DD'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  if (loading || !stats) {
    return (
      <div className="admin-dashboard-loading">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Quản Trị</h1>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          allowClear={false}
        />
      </div>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} className="stats-cards">
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card stat-card-primary">
            <Statistic
              title="Doanh thu hôm nay"
              value={stats.revenueToday}
              prefix={<DollarOutlined />}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card stat-card-success">
            <Statistic
              title="Lượt thuê hôm nay"
              value={stats.rentalsToday}
              prefix={<ShoppingOutlined />}
              suffix="đơn"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card stat-card-info">
            <Statistic
              title="Tỷ lệ sử dụng"
              value={stats.occupancyRate}
              prefix={<PercentageOutlined />}
              suffix="%"
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card">
            <Statistic
              title="Tổng số tòa nhà"
              value={stats.totalBuildings}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card">
            <Statistic title="Tổng số tủ" value={stats.totalLockers} prefix={<InboxOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card">
            <Statistic
              title="Ngăn đang sử dụng"
              value={stats.occupiedSlots}
              prefix={<AppstoreOutlined />}
              suffix={`/ ${stats.totalSlots}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Lượt thuê theo giờ" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.hourlyRentals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  label={{ value: 'Giờ', position: 'insideBottom', offset: -5 }}
                />
                <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#667eea" name="Lượt thuê" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Doanh thu theo giờ" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.hourlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#764ba2" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#764ba2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  label={{ value: 'Giờ', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'VND', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#764ba2"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Doanh thu"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Xu hướng trong ngày" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={stats.hourlyRentals.map((item, index) => ({
                  ...item,
                  revenue: stats.hourlyRevenue[index].amount,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  label={{ value: 'Giờ', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Lượt thuê', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Doanh thu (VND)', angle: 90, position: 'insideRight' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'Doanh thu') return formatCurrency(value);
                    return value;
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="count"
                  stroke="#667eea"
                  strokeWidth={2}
                  name="Lượt thuê"
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#764ba2"
                  strokeWidth={2}
                  name="Doanh thu"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
