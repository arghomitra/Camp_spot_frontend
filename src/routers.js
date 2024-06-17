import { createRouter, createWebHistory } from 'vue-router'; 

import HomeComponent from "./Pages/Home.vue"
import LoginComponent from "./Pages/Login.vue"
import AdminComponent from "./Pages/Admin.vue"
import CampSpots from "./Pages/CampSpots.vue"
import AboutComponent from "./Pages/About.vue"
import ForgetPassword from './Pages/ForgetPassword.vue';
import SpotDetails from './Pages/SpotDetails.vue';
import ProfileInfo from './Pages/ProfileInfo.vue';
import BookingHistory from './Pages/BookingHistory.vue';
import ConfirmBooking from './Pages/Booking.vue';
import AdminLoginComponent from './Pages/AdminLogin.vue'

const routes = [
    {
        name: "Home",
        component: HomeComponent,
        path: "/"
    },
    {
        name: "Login",
        component: LoginComponent,
        path: "/login"
    },
    {
        name: "AdminLogIn",
        component: AdminLoginComponent,
        path: "/admin-login"
    },
    {
        name: "Admin",
        component: AdminComponent,
        path: "/admin"
    },
    {
        name: "CampSpots",
        component: CampSpots,
        path: "/campspots"
    },
    {
        name: "About",
        component: AboutComponent,
        path: "/about"
    },
    {
        name: "Forget",
        component: ForgetPassword,
        path: "/forget_password"
    },
    {
        name: "SpotDetails",
        component: SpotDetails,
        path: "/spot_details/:id/:name",
        props:true
    },
    {
        name: "ProfileInfo",
        component: ProfileInfo,
        path: "/profile-info",
        
    },
    {
        name: "BookingHistory",
        component: BookingHistory,
        path: "/booking-history",
        
    },
    {
        name: "ConfirmBooking",
        component: ConfirmBooking,
        path: "/booking/:checkIn/:checkOut/:guests/:totalCost/:spot.id/:spot.name",
        props:true
        
    },

];

const router = createRouter({ 
    history: createWebHistory(),
    routes,
});
// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
//   });

export default router;
