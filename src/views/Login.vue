<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="nombre_usuario" placeholder="Nombre de Usuario" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nombre_usuario: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
            nombre_usuario: this.nombre_usuario,
            password: this.password,
          });
  
          // Guardar el usuario en localStorage
          localStorage.setItem('user', JSON.stringify(response.data.usuario));
  
          // Redirigir al dashboard u otra página
          this.$router.push('/home');
        } catch (error) {
          this.error = 'Credenciales incorrectas';
        }
      },
    },
  };
  </script>