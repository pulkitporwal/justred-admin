import { persistor } from "@/redux/store.js";

export function removeDataFromLocalStorage() {
  persistor.purge().then(() => {
    console.log("All data cleared from localStorage");
  });
}
