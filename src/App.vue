<template>
  <div id="app">
    <nav v-if="!isLoginPage" class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Inicio</router-link>
        <ul class="navbar-nav ms-auto">
          <!-- Solo se muestra si el usuario está autenticado -->
          <li class="nav-item dropdown" v-if="isLoggedIn">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <!-- Mostrar nombre y apellido del usuario -->
              Bienvenido, {{ user?.nombre || 'Usuario' }} {{ user?.apellido || '' }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" @click="logout">Cerrar Sesión</button>
              </li>
            </ul>
          </li>
        </ul>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Gestión Ganadera</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link active" to="/">Inicio</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Hierros
                </a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="/viewH">Listar Hierros</router-link></li>
                  <li><router-link class="dropdown-item" to="/createH">Crear Hierros</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Usuarios
                </a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="/viewU">Listar Usuarios</router-link></li>
                  <li><router-link class="dropdown-item" to="/createU">Crear Usuarios</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ganados
                </a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="/viewG">Listar Ganados</router-link></li>
                  <li><router-link class="dropdown-item" to="/createG">Crear Ganados</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Fincas
                </a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="/viewF">Listar Fincas</router-link></li>
                  <li><router-link class="dropdown-item" to="/createF">Crear Fincas</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Incidentes
                </a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="/viewI">Listar Incidentes</router-link></li>
                  <li><router-link class="dropdown-item" to="/createI">Crear Incidentes</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null, // Para almacenar los datos del usuario
    };
  },
  computed: {
    // Verificar si estamos en la página de login
    isLoginPage() {
      return this.$route.path === '/login';
    },
    // Verificar si el usuario está autenticado
    isLoggedIn() {
      return !!this.user; // Si user existe, retorna true
    },
  },
  mounted() {
    // Al montar el componente, cargar los datos del usuario desde localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData); // Cargar los datos si están en localStorage
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
  },
  methods: {
    // Método para cerrar sesión
    logout() {
      localStorage.removeItem('user'); // Eliminar el usuario de localStorage
      this.$router.push('/login'); // Redirigir a la página de login
    },
    getUsuarios() {
        this.cargando = true;  // Establecer el estado de carga
        axios.get(this.url)
          .then(res => {
            this.nombre = res.data.data.nombre;
            this.apellido = res.data.data.apellido;
          })
          .catch(error => {
            console.error("Error al obtener el usuario", error);
          })
          .finally(() => {
            this.cargando = false;  // Resetear el estado de carga
          });
      }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

