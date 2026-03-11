import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminDashboard from '../pages/AdminDashboard'
import AdminReports from '../pages/AdminReports'
import AdminUsers from '../pages/AdminUsers'
import Login from "../pages/Login"
import Dashboard from '../pages/Dashboard'
import NewReport from '../pages/NewReport'
import UploadCSV from '../pages/UploadCSV'
import MyReports from '../pages/MyReports'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>

                <Route path='/dashboard' element={<Dashboard />}/>

                <Route path='/new-report' element={<NewReport />}/>

                <Route path='/upload-csv' element={<UploadCSV />}/>

                <Route path='/my-reports' element={<MyReports />}/>

                <Route path='/admin' element={<AdminDashboard />}/>

                <Route path='/admin/users' element={<AdminUsers />}/>

                <Route path='/admin/reports' element={<AdminReports />}/>
            </Routes>
        </BrowserRouter>
    )
}
