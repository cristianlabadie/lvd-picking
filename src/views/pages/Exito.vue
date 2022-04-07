<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="exito">
        <ion-icon class="icono" :icon="checkmarkCircleOutline"></ion-icon>
        <h1>¡Exito!</h1>
        <p>El item fue escaneado correctamente</p>

        <ion-button @click="volver">Volver al inicio</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    IonContent,
    IonButton,
    IonIcon,
  } from "@ionic/vue";

  import { checkmarkCircleOutline } from "ionicons/icons";
  import { useRouter } from "vue-router";

  export default {
    name: "PaginaExito",
    components: {
      // IonHeader,
      // IonToolbar,
      // IonTitle,
      IonContent,
      IonPage,
      IonButton,
      IonIcon,
    },
    setup() {
      const router = useRouter();

      const volver = () => {
        router.push({
          name: "home",
          params: { action: "reset" },
        });
      };

      return {
        // iconos
        checkmarkCircleOutline,

        // funciones
        volver,
      };
    },
  };
</script>

<style scoped>
  .exito {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .icono {
    font-size: 80px;
    color: var(--ion-color-primary);
  }
</style>
