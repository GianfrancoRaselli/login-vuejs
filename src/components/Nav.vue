<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 w-100 mb-4">
        <a class="navbar-brand" v-on:click="irAInicio()">Mis Libros</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul v-if="usuarioLogueado" class="navbar-nav" style="margin-left: auto;">
                <li class="nav-item">
                    <a class="nav-link" v-on:click="irAListaDeLibros()"><i class="fas fa-list"></i> Libros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" v-on:click="irACrearLibro()"><i class="fas fa-plus-circle"></i> Agregar nuevo libro</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user"></i>&nbsp;{{nombreUsuario}}
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" v-on:click="irAPerfil()"><i class="fas fa-id-card"></i> Perfil</a>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" v-on:click="cerrarSesion"><i class="fas fa-sign-out-alt"></i>
                            Cerrar Sesión</button>
                    </div>
                </li>
            </ul>
            <ul v-else class="navbar-nav" style="margin-left: auto;">
                <li class="nav-item">
                    <a class="nav-link" v-on:click="irACrearCuenta()"><i class="fas fa-user-plus"></i> Crear Cuenta</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" v-on:click="irAIniciarSesion()"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { EventBus } from '../event-bus';
    export default {
        name: 'Nav',
        data() {
            return {
                nombreUsuario: localStorage.getItem('nombre_usuario') || '',
                usuarioLogueado: localStorage.getItem('token_usuario') ? true : false
            }
        },
        created() {
            EventBus.$on('inicioSesion', function() {
                this.nombreUsuario = localStorage.getItem('nombre_usuario') || '';
                this.usuarioLogueado = localStorage.getItem('token_usuario') ? true : false;
            }.bind(this)),
            EventBus.$on('cerrarSesion', function() {
                this.cerrarSesion();
            }.bind(this))
        },
        methods: {
            cerrarSesion() {
                localStorage.removeItem('token_usuario');
                localStorage.removeItem('nombre_usuario');

                this.nombreUsuario = localStorage.getItem('nombre_usuario') || '';
                this.usuarioLogueado = localStorage.getItem('token_usuario') ? true : false;

                this.$router.push('/');
            },
            irAListaDeLibros() {
                this.$router.push('/listlibros');
            },
            irACrearLibro() {
                this.$router.push('/formlibro');
            },
            irAPerfil() {
                this.$router.push('/perfil');
            },
            irAInicio() {
                this.$router.push('/listlibros');
            },
            irACrearCuenta() {
                this.$router.push('/signup');
            },
            irAIniciarSesion() {
                this.$router.push('/signin');
            },
        }
    }
</script>

<style scoped>
    a {
        cursor: pointer;
    }
</style>