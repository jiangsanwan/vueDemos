import { state } from '../state';

export default {
    // add(state: any, payload: any) {
    //     payload ? (state.age += payload) : state.age++;
    // },
    SET_USERNAME (state: any, username: string): void {
        state.username = username
    },
    SET_TOKEN (state: any, token: string): void {
        state.token = token
    }
}
