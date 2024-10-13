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
import FincaCreate from '../views/FincaCreate.vue'
import FincaEdit from '../views/FincaEdit.vue'
import FincaView from '../views/FincaView.vue'
import FincaViewDetail from '../views/FincaShow.vue'
import IncidenteCreate from '../views/IncidenteCreate.vue'
import IncidenteEdit from '../views/IncidenteEdit.vue'
import IncidenteView from '../views/IncidenteView.vue'
import IncidenteViewDetail from '../views/IncidenteShow.vue'
import GanadoCreate from '../views/GanadoCreate.vue'
import GanadoEdit from '../views/GanadoEdit.vue'
import GanadoView from '../views/GanadoView.vue'
import GanadoViewDetail from '../views/GanadoShow.vue'
import Login from '../views/Login.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/createH',
    name: 'createH',
    component: HierroCreate
  },
  {
    path: '/editH/:id',
    name: 'editH',
    component: HierroEdit
  },
  {
    path: '/viewH/:id',
    name: 'showH',
    component: HierroViewDetail
  },
  {
    path: '/viewH',
    name: 'viewH',
    component: HierroView
  },
  {
    path: '/createU',
    name: 'createU',
    component: UsuarioCreate
  },
  {
    path: '/editU/:id',
    name: 'editU',
    component: UsuarioEdit
  },
  {
    path: '/viewU/:id',
    name: 'showU',
    component: UsuarioViewDetail
  },
  {
    path: '/viewU',
    name: 'viewU',
    component: UsuarioView
  },
  {
    path: '/createF',
    name: 'createF',
    component: FincaCreate
  },
  {
    path: '/editF/:id',
    name: 'editF',
    component: FincaEdit
  },
  {
    path: '/viewF/:id',
    name: 'showF',
    component: FincaViewDetail
  },
  {
    path: '/viewF',
    name: 'viewF',
    component: FincaView
  },
  {
    path: '/createI',
    name: 'createI',
    component: IncidenteCreate
  },
  {
    path: '/editI/:id',
    name: 'editI',
    component: IncidenteEdit
  },
  {
    path: '/viewI/:id',
    name: 'showI',
    component: IncidenteViewDetail
  },
  {
    path: '/viewI',
    name: 'viewI',
    component: IncidenteView
  },
  {
    path: '/createG',
    name: 'createG',
    component: GanadoCreate
  },
  {
    path: '/editG/:id',
    name: 'editG',
    component: GanadoEdit
  },
  {
    path: '/viewG/:id',
    name: 'showG',
    component: GanadoViewDetail
  },
  {
    path: '/viewG',
    name: 'viewG',
    component: GanadoView
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

export default router