class Receipt {
  constructor() {
    this.items = [];
    this.total = 0;
    this.promotionDiscount = 0;
    this.membershipDiscount = 0;
    this.promotionDetails = [];
  }

  addItem(product, quantity) {
    this.items.push({ product, quantity });
    this.total += product.price * quantity;
  }

  applyPromotion(promotionDiscount, appliedPromotions) {
    this.promotionDiscount = promotionDiscount;
    appliedPromotions.forEach(({ product, freeQuantity }) => {
      this.addPromotionDetail(product, freeQuantity);
    });
  }

  addPromotionDetail(product, freeQuantity) {
    this.promotionDetails.push({ productName: product.name, freeQuantity });
  }

  applyMembershipDiscount(membershipDiscount) {
    this.membershipDiscount = membershipDiscount;
  }

  calculateTotal() {
    return this.total - this.promotionDiscount - this.membershipDiscount;
  }
  getPromotionDetails() {
    return this.promotionDetails;
  }
}

export default Receipt;
