import { Profile } from "../../pages/profile/Profile";
import { Home, User } from "../../shared/consts/images";
import HomePage from "../../pages/home/Home";

export const mainNavigation = [
    {
        title: 'Главная',
        path: '/home',
        icon: <Home />,
        element: <HomePage />,
        isAuth: false
    },
    {
        title: 'Профиль',
        path: '/profile',
        icon: <User />,
        element: <Profile />,
        isAuth: true
    }
]

