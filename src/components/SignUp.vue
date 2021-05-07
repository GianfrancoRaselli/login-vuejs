<template>
    <div class="row m-2">
        <div class="col-md-4 mx-auto">
            <div class="card text-center animate__animated animate__flipInY animate__fast">
                <div class="card-header">
                    <h3><strong>Crear Nueva Cuenta</strong></h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <input type="text" v-model="nombre_apellido" placeholder="Nombre y Apellido" class="form-control" autofocus>
                        </div>
                        <br>
                        <div class="form-group">
                            <input type="text" v-model="nombre_usuario" placeholder="Nombre Usuario" class="form-control">
                        </div>
                        <br>
                        <div class="form-group">
                            <input type="password" v-model="clave" placeholder="Clave" class="form-control">
                        </div>
                        <br>
                        <div class="form-group">
                            <input type="email" v-model="email" placeholder="Email" class="form-control">
                        </div>
                        <br>
                        <div class="form-group">
                            <button class="btn btn-success btn-block">
                                Crear Cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { EventBus } from '../event-bus'
    export default {
        name: 'SignUp',
        data() {
            return {
                nombre_apellido: '',
                nombre_usuario: '',
                clave: '',
                email: ''
            }
        },
        methods: {
            async handleSubmit() {
                try {
                    const res = await axios.post('usuarios/signup', 
                    {
                        nombre_apellido: this.nombre_apellido,
                        nombre_usuario: this.nombre_usuario,
                        clave: this.clave,
                        email: this.email
                    });
                    
                    localStorage.setItem('token_usuario', res.data.api_token);
                    localStorage.setItem('nombre_usuario', res.data.nombre_usuario || '');

                    EventBus.$emit('inicioSesion');

                    this.$router.push('/listlibros');
                } catch (err) {
                    console.log(err.response.data.error)
                }
            }
        }
    }
</script>