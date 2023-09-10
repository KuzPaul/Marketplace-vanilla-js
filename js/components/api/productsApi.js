export class ProductsApi {
  static async fetchProducts() {
    try {
      const response = await fetch("./data/data.json");

      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
      }

      const product = await response.json();

      return product;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
