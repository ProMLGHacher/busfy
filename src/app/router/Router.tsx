import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Main } from "../../pages/main/Main"
import { Test } from "../../pages/test/Test"
import { Login } from "../../pages/login/Login"
import { mainNavigation } from "./routes"
import { Registration } from "../../pages/registration/Registration"
import { useAppSelector } from "../store/storeHooks"
import { UserRole } from "../../features/authorization/authSlice"

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            ...mainNavigation.filter(e => !e.isAuth)
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registration',
        element: <Registration />
    },
    {
        path: "/test",
        element: <Test />
    },
    {
        path: '*',
        element: <Navigate to={'/'} />
    }
])

const userRouter = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            ...mainNavigation
        ]
    },
    {
        path: "/test",
        element: <Test />
    },
    {
        path: '*',
        element: <Navigate to={'/'} />
    }
])

export const RouterApp = () => {

    const user = useAppSelector(state => state.auth.user)

    return (
        <>
            {user ? user?.role === UserRole.Admin ? <RouterProvider router={mainRouter} /> : <RouterProvider router={userRouter} /> : <RouterProvider router={mainRouter} />}
        </>
    )
}
