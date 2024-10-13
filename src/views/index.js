import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HierroCreate from '../views/HierroCreate.vue'
import HierroEdit from '../views/HierroEdit.vue'
import HierroView from '../views/HierroView.vue'
import HierroViewDetail from '../views/HierroShow.vue'
import UsuarioCreate from '../views/UsuarioCreate.vue'
import UsuarioEdit from '../views/UsuarioEdit.vue'
import UsuarioView from '../views/UsuarioView.vue'
import UsuarioViewDetail from '../views/UsuarioShow.vue'
import Login from '../Login.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/createH',
    name: 'createH',
    component: HierroCreate,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/editH/:id',
    name: 'editH',
    component: HierroEdit,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/viewH/:id',
    name: 'showH',
    component: HierroViewDetail,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/viewH',
    name: 'viewH',
    component: HierroView,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/createU',
    name: 'createU',
    component: UsuarioCreate,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/editU/:id',
    name: 'editU',
    component: UsuarioEdit,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/viewU/:id',
    name: 'showU',
    component: UsuarioViewDetail,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/viewU',
    name: 'viewU',
    component: UsuarioView,
    meta: {requiresAuth: true} //Protegido, requiere autenticación
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true'; // Verifico si el usuario está autenticado

  if (to.meta.requiresAuth && !isAuthenticated) {
      // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
      next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
      // Si el usuario ya está autenticado y trata de ir al login, redirige al home
      next({ name: 'home' });
  } else {
      // En cualquier otro caso, deja que continúe
      next();
  }
});


export default router