import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Main } from "../../pages/main/Main"
import { Test } from "../../pages/test/Test"
import { Login } from "../../pages/login/Login"
import { mainNavigation } from "./routes"
import { Registration } from "../../pages/registration/Registration"
import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import { UserRole } from "../../features/authorization/authSlice"
import { DetailedPost } from "../../pages/detailedPost/DetailedPost"
import { useEffect, useState } from "react"
import { getUserThunk } from "../../features/authorization/getUserThunk"

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/post/:id',
                element: <DetailedPost />
            },
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
            {
                path: '/post/:id',
                element: <DetailedPost />
            },
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

    const [loading, setLoading] = useState(true)

    const user = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserThunk())
        .then(_ => {
            setLoading(false)
        })
        .catch(_ => {
            alert('плоха дела')
        })
    }, [])


    if (loading) return <>Loading...</>

    return (
        <>
            {user.tokens.accessToken ? user.user?.role === UserRole.Admin ? <RouterProvider router={mainRouter} /> : <RouterProvider router={userRouter} /> : <RouterProvider router={mainRouter} />}
        </>
    )
}
