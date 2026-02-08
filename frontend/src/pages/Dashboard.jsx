import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Overview from './Overview';
import History from './History';
import Profile from './Profile';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route index element={<Overview />} />
                <Route path="history" element={<History />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </DashboardLayout>
    );
};

export default Dashboard;
