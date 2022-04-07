<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="acciones">
        <span>Escaneé Item</span>

        <span>o</span>

        <span>Pedido</span>

        <form @submit.prevent="onScanCode">
          <ion-item>
            <ion-input
              ref="inputBarcode"
              :autofocus="true"
              v-model="barcodeInput"
            />
          </ion-item>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    onIonViewWillEnter,
  } from "@ionic/vue";
  import { useRoute, useRouter } from "vue-router";

  export default defineComponent({
    name: "TabHome",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonInput,
      IonItem,
    },
    setup() {
      // Variables
      const barcodeInput = ref<string>("");

      // helpers
      const router = useRouter();
      const route = useRoute();

      // Funciones
      const onScanCode = () => {
        console.log("onScanCode:", barcodeInput.value);

        // Aca tenemos que analizar si el código ingresado contiene la primera letra una "p" mayuscula o minuscula, si la posee es un pedido, sino, un item
        router.push({
          name: "detalleEscaneo",
          params: { barcode: barcodeInput.value },
        });
      };

      onIonViewWillEnter(() => {
        if (route.params.action == "reset") {
          barcodeInput.value = "";
        }
      });

      return {
        // Variables
        barcodeInput,

        // Funciones
        onScanCode,
      };
    },
  });
</script>

<style scoped>
  .acciones {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
</style>
