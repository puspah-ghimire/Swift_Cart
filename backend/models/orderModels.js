class Order {
  constructor(
    shippingInfo,
    orderItems,
    user,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    deliveredAt = null, // Set to null initially
    paidAt = new Date(),
    createdAt = new Date()
  ) {
    this.shippingInfo = shippingInfo;
    this.orderItems = orderItems;
    this.user = user;
    this.paymentInfo = paymentInfo;
    this.itemsPrice = itemsPrice;
    this.shippingPrice = shippingPrice;
    this.totalPrice = totalPrice;
    this.orderStatus = orderStatus;
    this.deliveredAt = deliveredAt;
    this.paidAt = paidAt;
    this.createdAt = createdAt;
  }
}

export default Order;
