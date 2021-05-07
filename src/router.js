import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Perfil from './components/Perfil.vue'
import Inicio from './components/Inicio.vue'
import FormLibro from './components/FormLibro.vue'
import ListLibros from './components/ListLibros.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/signup',
            component: SignUp,
            meta: {
                notAuth: true
            }
        },
        {
            path: '/signin',
            component: SignIn,
            meta: {
                notAuth: true
            }
        },
        {
            path: '/perfil',
            component: Perfil,
            meta: {
                auth: true
            }
        },
        {
            path: '/',
            component: Inicio
        },
        {
            path: '/formlibro',
            component: FormLibro,
            meta: {
                auth: true
            }
        },
        {
            path: '/formlibro/:id',
            component: FormLibro,
            meta: {
                auth: true
            }
        },
        {
            path: '/listlibros',
            component: ListLibros,
            meta: {
                auth: true
            }
        },
    ]
})


router.beforeEach(async (to, from, next) => {
    let user = null;
    if (localStorage.getItem('token_usuario')) {
        try {
            let res = await axios.get('usuarios/perfil',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token_usuario')
                }
            });

            user = res.data;
        } catch (err) {
            localStorage.removeItem("token_usuario");
            localStorage.removeItem("nombre_usuario");
        }
    }
    let auth = to.matched.some(record => record.meta.auth);
    let notAuth = to.matched.some(record => record.meta.notAuth);

    if (auth && !user) {
        next('signin');
    } else if (notAuth && user) {
        next('');
    } else {
        next();
    }
})


export default router;