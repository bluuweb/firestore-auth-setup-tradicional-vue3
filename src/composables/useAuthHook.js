import { firebase, auth } from '../firebase/config'
import {useRouter} from 'vue-router'

export const useAuthHook = () => {

    const router = useRouter()

    const singIn = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider)
            await router.push('/perfil')
        } catch (error) {
            console.log(error)
        }
    }

    const singOut = async () => {
        try {
            await auth.signOut()
            await router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return {singIn, singOut}

}