export enum PaymentStatus {
  notProcessed = 'notProcessed', // The order has not been processed yet.
  processed = 'processed', // The order has been processed.
  shipped = 'shipped', // The order has been shipped.
  delivered = 'delivered', // The order has been delivered.
  refunded = 'refunded', // The order has been refunded.
  partiallyRefunded = 'partiallyRefunded', // The order has been partially refunded.
  cancelled = 'cancelled', // The order has been cancelled.
}