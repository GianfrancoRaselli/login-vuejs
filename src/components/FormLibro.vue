<template>
    <div class="row">
        <div class="col-md-4 offset-md-2 mb-3">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="editando ? actualizarLibro() : guardarLibro()">
                        <div class="form-group">
                            <input type="text" v-model="libro.titulo" placeholder="Titulo"
                                class="form-control" autofocus>
                        </div>
                        <div class="form-group">
                            <input type="url" v-model="libro.imagen" placeholder="URL Imagen"
                                class="form-control">
                        </div>
                        <button class="btn btn-success btn-block">
                            Guardar
                        </button>
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
        name: 'FormLibro',
        data() {
            return {
                editando: false,
                libro: {
                    id: null,
                    titulo: null,
                    imagen: null
                }
            }
        },
        methods: {
            async guardarLibro() {
                if (localStorage.getItem('token_usuario')) {
                    try {
                        await axios.post('libros',
                        {
                            titulo: this.libro.titulo,
                            imagen: this.libro.imagen
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token_usuario')
                            }
                        });

                        this.$router.push('/listlibros');
                    } catch (err) {
                        console.log(err.response.data.error)
                    }
                } else {
                    EventBus.$emit('cerrarSesion');
                }
            },
            async actualizarLibro() {
                if (localStorage.getItem('token_usuario')) {
                    try {
                        await axios.post('libros/' + this.libro.id,
                        {
                            titulo: this.libro.titulo,
                            imagen: this.libro.imagen
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token_usuario')
                            }
                        });

                        this.$router.push('/listlibros');
                    } catch (err) {
                        console.log(err.response.data.error)
                    }
                } else {
                    EventBus.$emit('cerrarSesion');
                }
            }
        },
        async created() {
            if (this.$route.params.id) {
                this.editando = true;

                if (localStorage.getItem('token_usuario')) {
                    try {
                        const res = await axios.get('libros/' + this.$route.params.id,
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token_usuario')
                            }
                        });

                        this.libro = res.data;
                    } catch (err) {
                        console.log(err.response.data.error)
                    }
                } else {
                    EventBus.$emit('cerrarSesion');
                }
            } else {
                this.editando = false;
                this.libro = {
                    id: null,
                    titulo: null,
                    imagen: null
                }
            }
        }
    }
</script>