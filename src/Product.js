class Product {
  constructor(name, price, quantity, promotion = null) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
  }

  reduceQuantity(count) {
    if (this.quantity < count) throw new Error("재고가 부족합니다.");
    this.quantity -= count;
  }
}

export default Product;
