import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginThunk } from './loginThunk'
import { confirmSignUpThunk } from './confirmSignUpThunk'
import { getUserThunk } from './getUserThunk'
import { updateUserThunk } from './updateUserThunk'

export enum UserRole {
    Admin = 'Admin',
    User = 'User'
}
export enum AccountStatus {
    Active = 'Active',
    Suspended = 'Suspended',
    Banned = 'Banned'
}

type AuthState = {
    isLoading: boolean,
    error: undefined | string,
    tokens: {
        accessToken: string | null,
        refreshToken: string | null
    },
    user?: {
        id?: string | null
        email?: string | null,
        role?: UserRole | null,
        urlIcon?: string | null,
        urlBackgroundImage?: string | null,
        nickname?: string | null,
        bio?: string | null,
        userTag?: string | null,
        accountStatus?: AccountStatus | null,
        subscriberCount?: number,
        countLikes?: number
    }
}

const initialState: AuthState = {
    isLoading: false,
    error: undefined,
    tokens: {
        accessToken: null,
        refreshToken: localStorage.getItem('refreshToken')
    },
    user: localStorage.getItem('refreshToken') ? {
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role') as UserRole | null,
        urlIcon: localStorage.getItem('urlIcon'),
        urlBackgroundImage: localStorage.getItem('urlBackgroundImage'),
        nickname: localStorage.getItem('nickname'),
        bio: localStorage.getItem('bio'),
        userTag: localStorage.getItem('userTag'),
        accountStatus: localStorage.getItem('accountStatus') as AccountStatus | null
    } : undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.isLoading = false
            state.tokens.accessToken = null
            state.tokens.refreshToken = null
            state.user = undefined

            localStorage.removeItem('id')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('email')
            localStorage.removeItem('role')
            localStorage.removeItem('urlIcon')
            localStorage.removeItem('urlBackgroundImage')
            localStorage.removeItem('nickname')
            localStorage.removeItem('bio')
            localStorage.removeItem('userTag')
            localStorage.removeItem('accountStatus')
        },
        setTokens: (state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
            state.tokens.accessToken = action.payload.accessToken
            state.tokens.refreshToken = action.payload.refreshToken
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.tokens.accessToken = action.payload.tokenPair.accessToken
            state.tokens.refreshToken = action.payload.tokenPair.refreshToken

            state.user = {
                ...state.user,
                id: payload.profile.id,
                email: payload.profile.email,
                role: payload.profile.role,
                urlIcon: payload.profile.urlIcon,
                urlBackgroundImage: payload.profile.urlBackgroundImage,
                nickname: payload.profile.nickname,
                bio: payload.profile.bio,
                userTag: payload.profile.userTag,
                accountStatus: payload.profile.accountStatus
            }

            localStorage.setItem('refreshToken', action.payload.tokenPair.refreshToken)
            if (action.payload.profile.email) localStorage.setItem('id', action.payload.profile.id);
            if (action.payload.profile.email) localStorage.setItem('email', action.payload.profile.email);
            if (action.payload.profile.role) localStorage.setItem('role', action.payload.profile.role);
            if (action.payload.profile.urlIcon) localStorage.setItem('urlIcon', action.payload.profile.urlIcon);
            if (action.payload.profile.urlBackgroundImage) localStorage.setItem('urlBackgroundImage', action.payload.profile.urlBackgroundImage);
            if (action.payload.profile.nickname) localStorage.setItem('nickname', action.payload.profile.nickname);
            if (action.payload.profile.bio) localStorage.setItem('bio', action.payload.profile.bio);
            if (action.payload.profile.userTag) localStorage.setItem('userTag', action.payload.profile.userTag);
            localStorage.setItem('accountStatus', action.payload.profile.accountStatus)

            state.error = undefined
            state.isLoading = false
        })
        builder.addCase(loginThunk.rejected, (state, payload) => {
            state.error = payload.payload
            state.isLoading = false
        })
        builder.addCase(confirmSignUpThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.tokens.accessToken = action.payload.tokenPair.accessToken
            state.tokens.refreshToken = action.payload.tokenPair.refreshToken

            state.user = {
                ...state.user,
                id: payload.profile.id,
                email: payload.profile.email,
                role: payload.profile.role,
                urlIcon: payload.profile.urlIcon,
                urlBackgroundImage: payload.profile.urlBackgroundImage,
                nickname: payload.profile.nickname,
                bio: payload.profile.bio,
                userTag: payload.profile.userTag,
                accountStatus: payload.profile.accountStatus
            }

            localStorage.setItem('refreshToken', action.payload.tokenPair.refreshToken)
            if (action.payload.profile.id) localStorage.setItem('id', action.payload.profile.id);
            if (action.payload.profile.email) localStorage.setItem('email', action.payload.profile.email);
            if (action.payload.profile.role) localStorage.setItem('role', action.payload.profile.role);
            if (action.payload.profile.urlIcon) localStorage.setItem('urlIcon', action.payload.profile.urlIcon);
            if (action.payload.profile.urlBackgroundImage) localStorage.setItem('urlBackgroundImage', action.payload.profile.urlBackgroundImage);
            if (action.payload.profile.nickname) localStorage.setItem('nickname', action.payload.profile.nickname);
            if (action.payload.profile.bio) localStorage.setItem('bio', action.payload.profile.bio);
            if (action.payload.profile.userTag) localStorage.setItem('userTag', action.payload.profile.userTag);
            localStorage.setItem('accountStatus', action.payload.profile.accountStatus)

            state.error = undefined
            state.isLoading = false
        })
        builder.addCase(confirmSignUpThunk.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })
        builder.addCase(confirmSignUpThunk.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(getUserThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.user = {
                ...state.user,
                email: payload.profile.email,
                role: payload.profile.role,
                urlIcon: payload.profile.urlIcon,
                urlBackgroundImage: payload.profile.urlBackgroundImage,
                nickname: payload.profile.nickname,
                bio: payload.profile.bio,
                userTag: payload.profile.userTag,
                accountStatus: payload.profile.accountStatus,
                countLikes: payload.countLikes,
                subscriberCount: payload.subscriberCount,
                id: payload.profile.id
            }

            if (action.payload.profile.id) localStorage.setItem('id', action.payload.profile.id);
            if (action.payload.profile.email) localStorage.setItem('email', action.payload.profile.email);
            if (action.payload.profile.role) localStorage.setItem('role', action.payload.profile.role);
            if (action.payload.profile.urlIcon) localStorage.setItem('urlIcon', action.payload.profile.urlIcon);
            if (action.payload.profile.urlBackgroundImage) localStorage.setItem('urlBackgroundImage', action.payload.profile.urlBackgroundImage);
            if (action.payload.profile.nickname) localStorage.setItem('nickname', action.payload.profile.nickname);
            if (action.payload.profile.bio) localStorage.setItem('bio', action.payload.profile.bio);
            if (action.payload.profile.userTag) localStorage.setItem('userTag', action.payload.profile.userTag);

        })
        builder.addCase(updateUserThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.user = {
                ...state.user,
                id: payload.id,
                email: payload.email,
                role: payload.role,
                urlIcon: payload.urlIcon,
                urlBackgroundImage: payload.urlBackgroundImage,
                nickname: payload.nickname,
                bio: payload.bio,
                userTag: payload.userTag,
                accountStatus: payload.accountStatus,
            }

            if (action.payload.id) localStorage.setItem('email', action.payload.id);
            if (action.payload.email) localStorage.setItem('email', action.payload.email);
            if (action.payload.role) localStorage.setItem('role', action.payload.role);
            if (action.payload.urlIcon) localStorage.setItem('urlIcon', action.payload.urlIcon);
            if (action.payload.urlBackgroundImage) localStorage.setItem('urlBackgroundImage', action.payload.urlBackgroundImage);
            if (action.payload.nickname) localStorage.setItem('nickname', action.payload.nickname);
            if (action.payload.bio) localStorage.setItem('bio', action.payload.bio);
            if (action.payload.userTag) localStorage.setItem('userTag', action.payload.userTag);

        })
    }
})



export const { logOut, setTokens } = authSlice.actions

export default authSlice.reducer

