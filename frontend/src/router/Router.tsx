import  {BrowserRouter, Routes, Route} from 'react-router-dom'

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
            </Routes>
        </BrowserRouter>
    )
}
