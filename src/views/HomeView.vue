<template>
    <div class="container mt-5">
      <div class="row align-items-md-stretch ">
        <div class="col-md-6 mt-5">
          <div class="h-100 p-5 text-bg-dark rounded-3">
            <h2>Administrar Fincas</h2>
            <p>Por medio de este enlace puedes ir a ver las fincas listadas</p>
            <router-link to="viewF" class="btn btn-outline-light" type="button">Ver Finca</router-link>
          </div>
        </div>
        <div class="col-md-6 mt-5">
          <div class="h-100 p-5 text-bg-dark rounded-3">
            <h2>Administrar Ganado</h2>
            <p>Por medio de este enlace puedes ir a ver los Ganados listados</p>
            <router-link to="viewG" class="btn btn-outline-light" type="button">Ver Ganado</router-link>
          </div>
        </div>
      </div>
      <div class="row align-items-md-stretch ">
        <div class="col-md-6 mt-5">
          <div class="h-100 p-5 text-bg-danger rounded-3">
            <img src="https://i.pinimg.com/originals/fd/aa/6f/fdaa6f83c25045ea25e24548def910f6.jpg" class="custom-image" alt="">
          </div>
        </div>
        <div class="col-md-6 mt-5">
          <div class="h-100 p-5 text-bg-danger rounded-3">
            <img src="https://as1.ftcdn.net/v2/jpg/04/92/34/50/1000_F_492345048_iaEHZlAMfYKJOuvDROU1UtwDqHl9hkfj.jpg" class="custom-image" alt="">
          </div>
        </div>          
        </div>
    </div>
    <div class="container-fluid">
      <router-view/>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      setTimeout(() => {
        localStorage.setItem('authenticated', 'false'); // Elimina la variable
        console.log('La variable authenticated ha sido eliminada.');
      }, 50000);
    }
  }
  </script>
  
  <style>
  .custom-image {
    width: 100%;         /* La imagen ocupará el 100% del ancho del contenedor */
    height: auto;        /* Mantener la proporción de la imagen */
    max-height: 300px;   /* Establecer una altura máxima */
    object-fit: cover;   /* Asegurarse de que la imagen se ajuste bien al recuadro sin deformarse */
    border-radius: 10px; /* Añadir bordes redondeados si deseas */
  }
  </style>
  