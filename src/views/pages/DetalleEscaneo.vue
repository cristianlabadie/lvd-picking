<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-row>
              <ion-col size="6">
                <img v-if="item.id" src="/assets/acido.jpeg" />
              </ion-col>
              <ion-col size="6">
                <ion-label>
                  <h2>Nombre: {{ item.nombre }}</h2>
                  <p>Unidad: {{ item.unidad }}</p>
                </ion-label>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="12">
                <ion-label>
                  <span>Cantidad: {{ item.cantidad }}</span>
                </ion-label>
              </ion-col>
              <ion-col size="12" v-if="barcodeTypeDetected == 'pedido'">
                <ion-item>
                  <form @submit.prevent="onGetBarcode">
                    <ion-input
                      v-model="inputBarcodeItem"
                      placeholder="Código de item"
                    ></ion-input>
                  </form>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-row>
              <ion-col size="12">
                <ion-item>
                  <ion-label>
                    <h2>Pedido</h2>
                    <p>{{ pedido.id }}</p>
                  </ion-label>
                </ion-item>
              </ion-col>
              <ion-col size="12">
                <ion-item>
                  <ion-label>
                    <h2>Ruta</h2>
                    <p>{{ pedido.ruta }}</p>
                  </ion-label>
                </ion-item>
              </ion-col>
              <ion-col size="12">
                <ion-item>
                  <ion-label>
                    <h2>Orden</h2>
                    <p>{{ pedido.orden }}</p>
                  </ion-label>
                </ion-item>
              </ion-col>
              <ion-col size="12" v-if="barcodeTypeDetected == 'item'">
                <ion-item>
                  <form @submit.prevent="onGetBarcode">
                    <ion-input
                      v-model="inputBarcodePedido"
                      placeholder="Código de pedido"
                    ></ion-input>
                  </form>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    // IonThumbnail,
    // IonImg,
    IonLabel,
    onIonViewWillEnter,
    IonItem,
    IonInput,
    loadingController,
    onIonViewWillLeave,
  } from "@ionic/vue";
  import { defineComponent, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  export default defineComponent({
    name: "DetalleEscaneo",
    components: {
      IonContent,
      IonPage,
      IonGrid,
      IonRow,
      IonCol,
      // IonThumbnail,
      // IonImg,
      IonLabel,
      IonItem,
      IonInput,
    },
    setup() {
      // Interfaces
      interface Item {
        id: string | number;
        src: string;
        nombre: string;
        unidad: string;
        cantidad: number;
      }

      interface Pedido {
        id: string;
        items: Item[];
        ruta: string;
        orden: number;
      }

      // Variables
      const pedido = ref<Pedido>({
        id: "No definido",
        items: [],
        ruta: "No definido",
        orden: 0,
      });
      const item = ref<Item>({
        id: "",
        src: "",
        nombre: "",
        unidad: "",
        cantidad: 0,
      });

      const barcodeTypeDetected = ref<string>("");
      const inputBarcodeItem = ref("");
      const inputBarcodePedido = ref("");

      // Helpers
      const route = useRoute();
      const router = useRouter();

      // Funciones
      const limpiarDatos = () => {
        pedido.value = {
          id: "No definido",
          items: [],
          ruta: "No definido",
          orden: 0,
        };
        item.value = {
          id: "",
          src: "",
          nombre: "",
          unidad: "",
          cantidad: 0,
        };

        // limpiar los inputs de barcode y el tipo de barcode detectado
        inputBarcodeItem.value = "";
        inputBarcodePedido.value = "";
        barcodeTypeDetected.value = "";
      };

      const onGetBarcode = async () => {
        if (barcodeTypeDetected.value == "pedido") {
          item.value = {
            id: inputBarcodeItem.value,
            src: "/assets/acido.jpeg",
            nombre: "Ácido Fólico",
            unidad: "7,8 g",
            cantidad: 2,
          };
        } else {
          pedido.value = {
            id: inputBarcodePedido.value.substr(1),
            items: [],
            ruta: "Ruta X",
            orden: 3,
          };
        }

        if (item.value.id && pedido.value.id) {
          const loading = await loadingController.create({
            spinner: "circular",
            duration: 3000,
            message: "Procesando...",
            translucent: true,
            backdropDismiss: true,
          });

          await loading.present();

          setTimeout(function () {
            loading.dismiss();
            router.push({ path: "exito" });
          }, 3000);
        }
      };

      onIonViewWillEnter(() => {
        if (route.params.barcode) {
          // vamos a analizar el código de barras, si la primera letra es una "p" es un pedido, sino, un item
          if (typeof route.params.barcode === "string") {
            if (route.params.barcode.toLowerCase().startsWith("p")) {
              // es un pedido
              // Si es pedido el barcode, entonces hay que remover la primera p y luego asociar el pedido al objeto vacio
              barcodeTypeDetected.value = "pedido";
              pedido.value = {
                id: route.params.barcode.substr(1),
                items: [],
                ruta: "Ruta X",
                orden: 3,
              };
            } else {
              // es un item
              barcodeTypeDetected.value = "item";
              item.value = {
                id: route.params.barcode,
                src: "/assets/acido.jpeg",
                nombre: "Ácido Fólico",
                unidad: "7,8 g",
                cantidad: 2,
              };
            }
          }
        }

        if (!route.params.barcode) {
          router.push({ path: "home" });
        }
      });

      onIonViewWillLeave(() => {
        limpiarDatos();
      });

      return {
        //variables
        pedido,
        item,
        inputBarcodeItem,
        inputBarcodePedido,
        barcodeTypeDetected,

        // funciones
        onGetBarcode,
      };
    },
  });
</script>

<style scoped></style>
