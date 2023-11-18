import {Routes, Route} from 'react-router-dom'
import { Home } from '../Home/Home'
import { Register } from '../Register/Register'
import { Login } from '../Login/Login'
import { Profile } from '../Profile/Profile'
import { Products } from '../Products/Products'
import { Appointments } from '../Appointments/Appointments'
import { Workers } from '../Workers/Workers'
import { AppointmentSuperAdmin } from '../Appointments/AppointmentSuperAdmin/AppointmentSuperAdmin'

export const Body = () => {
    return (
        <>
        <Routes>
            {/* <Route path='*' element={<Navigate to='/' />}/> */}
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/worker' element={<Workers />}/>
            <Route path='/product' element={<Products />}/>
            <Route path='/appointment/user' element={<Appointments />}/>
            <Route path='/appointment' element={<AppointmentSuperAdmin />}/>

        </Routes>
        </>
    )
}