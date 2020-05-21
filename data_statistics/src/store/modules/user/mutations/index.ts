import { State } from './../state'
export default {
    add(state: any, payload: any) {
        payload ? (state.age += payload) : state.age++;
    },
}
