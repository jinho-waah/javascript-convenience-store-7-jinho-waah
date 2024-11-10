import { OutputView } from "./OutputView.js";
import { InputView } from "./InputView.js";
import Store from "./Store.js";

class App {
  async run() {
    try {
      const store = new Store();
      await store.loadProducts();
      await store.loadPromotions();

      OutputView.welcome();
      OutputView.printProducts(store.products);
    } catch (error) {
      throw new Error(`[ERROR] `);
    }
  }
}

export default App;
