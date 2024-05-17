import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import { APP_ROUTES } from "../utilities/constants";
import { BoDashboard, FaqPage, Feedback, FeedbackDashboard, Login,ManagerScreen, UserFeedbackView } from '../pages';
import Header from '../components/Header/Header';


const MainLayout = ({ children }:any) => (
  <>
    <Header/>
    {children}
  </>
);
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={APP_ROUTES.ROOT} element={<Login />} />
      {/* Manager Routes */}
      <Route path={APP_ROUTES.MANAGER_MANAGEMENT} element={<BoDashboard/>}/>
      <Route path={APP_ROUTES.CREATE_MANAGER} element={<ManagerScreen/>}/>

      {/* Feedback Routes */}
      <Route path={APP_ROUTES.FEEDBACK_MANAGEMENT} element={<FeedbackDashboard/>}/>

         {/* Feedback Routes-User  Header attached */}
      <Route path={APP_ROUTES.USER_FEEDBACK_VIEW} element={<MainLayout><Feedback /></MainLayout>} />
      <Route path={APP_ROUTES.CREATE_FEEDBACK} element={<MainLayout><UserFeedbackView /></MainLayout>} />
      <Route path={APP_ROUTES.View_FAQ} element={<MainLayout><FaqPage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes