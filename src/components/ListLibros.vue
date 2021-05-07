<template>
    <div>
        <div class="row m-2">
            <div class="col-md-4 p-3">
                <div :key="libro.id" v-for="libro in libros" class="card text-center">
                    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <div class="col-9 text-wrap" v-text="libro.titulo"></div>
                        <button class="btn btn-danger float-right" v-on:click="eliminarLibro(libro.id)">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                    <img class="card-img-top" :src="libro.imagen">
                    <div class="card-body">
                        <a class="btn btn-info btn-block" v-on:click="actualizarLibro(libro.id)">
                            Editar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { EventBus } from '../event-bus'
    export default {
        name: 'ListLibros',
        data() {
            return {
                libros: []
            }
        },
        methods: {
            async buscarLibros() {
                if (localStorage.getItem('token_usuario')) {
                    try {
                        const res = await axios.get('libros', 
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token_usuario')
                            }
                        });

                        this.libros = res.data;
                    } catch (err) {
                        console.log(err.response.data.error)
                    }
                } else {
                    EventBus.$emit('cerrarSesion');
                }
            },
            async actualizarLibro(id) {
                if (localStorage.getItem('token_usuario')) {
                    this.$router.push('/formlibro/' + id);
                } else {
                    EventBus.$emit('cerrarSesion');
                }
            },
            async eliminarLibro(id) {
                if (localStorage.getItem('token_usuario')) {
                    try {
                        await axios.delete('libros/' + id, 
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token_usuario')
                            }
                        });

                        this.buscarLibros();
                    } catch (err) {
                        console.log(err.response.data.error)
                    }
                } else {
                    EventBus.$emit('cerrarSesion');
                }
            }
        },
        created() {
            this.buscarLibros();
        }
    }
</script>