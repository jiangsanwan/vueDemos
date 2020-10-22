import { storage, tokenTableName } from '@/config'
import cookie from 'js-cookie'

/**
 * 获取accessToken
 */
export function getAccessToken () {
    if (storage) {
        switch (storage) {
            case 'localStorage':
                return localStorage.getItem(tokenTableName)
            case 'sessionStorage':
                return sessionStorage.getItem(tokenTableName)
            case 'cookie':
                return cookie.get(tokenTableName)
        }
    } else {
        return localStorage.getItem(tokenTableName)
    }
}
/**
 * 存储accessToken
 */
export function setAccessToken (accessToken) {
    if (storage) {
        switch (storage) {
            case 'localStorage':
                return localStorage.setItem(tokenTableName, accessToken)
            case 'sessionStorage':
                return sessionStorage.setItem(tokenTableName, accessToken)
            case 'cookie':
                return cookie.set(tokenTableName, accessToken)
        }
    } else {
        return localStorage.setItem(tokenTableName, accessToken)
    }
}
/**
 * 移除accessToken
 */
export function removeAccessToken () {
    if(storage) {
        switch (storage) {
            case 'localStorage':
                return localStorage.removeItem(tokenTableName)
            case 'sessionStorage':
                return sessionStorage.removeItem(tokenTableName)
            case 'cookie':
                return cookie.remove(tokenTableName)
        }
    } else {
        localStorage.removeItem(tokenTableName)
    }
}