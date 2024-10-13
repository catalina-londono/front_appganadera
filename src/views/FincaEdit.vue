<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Editar Finca
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="actualizar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese el nuevo nombre" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="ubicacion" id="ubicacion" placeholder="Ingrese el nuevo ubicacion" maxlength="50" class="form-control">
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mostrarAlerta, confirmarActualizacion } from '../funciones';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        id: 0,
        nombre: '',
        ubicacion: '',
        url: 'http://127.0.0.1:8000/api/v1/fincas',  
        cargando: false
      };
    },
    mounted() {
      setTimeout(() => {
    localStorage.setItem('authenticated', 'false'); // Elimina la variable
    console.log('La variable authenticated ha sido eliminada.');
  }, 50000);
      const route = useRoute();
      this.id = route.params.id;
      this.url += '/' + this.id;
      this.getFincas();
    },
    methods: {
      getFincas() {
        axios.get(this.url).then(res => {
          this.nombre = res.data.data.nombre;
          this.ubicacion = res.data.data.ubicacion;
        }).catch(error => {
          console.error("Error al obtener las fincas:", error);
        });
      },
      actualizar() {
      // Previene el comportamiento por defecto del formulario
      event.preventDefault(); 
  
      // Validar campos antes de confirmar
      if (this.nombre.trim() === '') {
          mostrarAlerta('Ingrese un nombre', 'warning', 'nombre');
      } else if (this.ubicacion ==='') {
          mostrarAlerta('Ingrese una ubicacion', 'warning', 'ubicacion');
      } else {
          const parametros = {
              nombre: this.nombre.trim(),
              ubicacion: this.ubicacion.trim(),
          };
          
          // Llama a confirmarActualizacion en lugar de enviarSolicitud
          confirmarActualizacion(this.url, this.id, 'Confirmar Actualización', '¿Está seguro que desea actualizar esta finca?', parametros, () => {
          this.getFincas(); // Recarga los datos después de actualizar
          console.log('Callback de confirmación ejecutado');
        });
      }
  }
  
    }
  };
  </script>