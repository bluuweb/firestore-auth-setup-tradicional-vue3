import {useAuth} from '@vueuse/firebase'
import { db, marcaTiempo } from '../firebase/config'
import {ref} from 'vue'

export const useTodos = () => {

    const { user } = useAuth()

    const cargando = ref(false)
    const refencia = db.collection('todos')
    
    const getTodos = async () => {
        try {
            cargando.value = true
            const res = await refencia
                .where("uid", "==", user.value.uid)
                .get()
            return res.docs.map(doc => ({...doc.data(), id: doc.id}))
        } catch (error) {
            console.log(error)
            return {
                error: error,
                res: true
            }
        } finally {
            cargando.value = false
        }
    }

    const agregarTodo = async (texto) => {
        try {
            const todo = {
                fecha: marcaTiempo(),
                estado: false,
                uid: user.value.uid,
                texto: texto
            }
            const res = await refencia.add(todo)
            return {id: res.id, ...todo}
        } catch (error) {
            console.log(error)
            return {
                error: error,
                res: true
            }
        }
    }

    const eliminarTodo = async (id) => {
        try {
            await refencia.doc(id).delete()

            return {res: false}
        } catch (error) {
            return {
                error: error,
                res: true
            }
        }
    }

    const modificarTodo = async (todo) => {
        try {

            await refencia.doc(todo.id).update({
                estado: !todo.estado
            })

            return {res: false}
            
        } catch (error) {
            return {
                error: error,
                res: true
            }
        }
    }


    return {getTodos, cargando, agregarTodo, eliminarTodo, modificarTodo}

}