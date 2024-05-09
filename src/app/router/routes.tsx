import { Profile } from "../../pages/profile/Profile";
import { Home, Plus, User } from "../../shared/consts/images";
import HomePage from "../../pages/home/Home";
import NewPost from "../../pages/newPost/NewPost";

export const mainNavigation = [
    {
        title: 'Главная',
        path: '/',
        icon: <Home />,
        element: <HomePage />,
        isAuth: false
    },
    {
        title: 'Новый пост',
        path: '/newPost',
        icon: <Plus />,
        element: <NewPost />,
        isAuth: true
    },
    {
        title: 'Профиль',
        path: '/profile',
        icon: <User />,
        element: <Profile />,
        isAuth: true
    }
]

