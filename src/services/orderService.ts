import { IOrderRepository } from '../repositories/orderRepository';
import { NotificationService } from './notificationService';
import { ProductFactory } from '../domain/product';
export class ValidationError extends Error {}
export class OrderService {
  private orderRepository: IOrderRepository;
  private notificationService: NotificationService;
  private paymentMethods: any;
  constructor(orderRepository: IOrderRepository, notificationService: NotificationService, paymentMethods: any) {
    this.orderRepository = orderRepository;
    this.notificationService = notificationService;
    this.paymentMethods = paymentMethods;
  }
  async placeOrder(customer: string, items: any[], paymentMethod: string, paymentDetails: any) {
    if (!items || items.length === 0) {
      throw new ValidationError('Carrinho vazio');
    }
    let total = 0;
    const productsDetails = [];
    for (const item of items) {
      const data = await this.orderRepository.findProductById(item.productId);
      if (!data) {
        throw new ValidationError(`Produto ${item.productId} não encontrado`);
      }
      const product = ProductFactory.createProduct(data);
      total += product.price * item.quantity;
      total += product.calculateFreight(); 
      productsDetails.push({ ...data, quantity: item.quantity });
    }
    const payment = this.paymentMethods[paymentMethod];
    if (!payment) {
      throw new ValidationError('Método de pagamento não suportado');
    }
    payment.process(paymentDetails); 
    const order = await this.orderRepository.createOrder({
      customer,
      items: JSON.stringify(productsDetails),
      total,
      status: 'confirmed',
    });
    const emailPreview = await this.notificationService.sendOrderConfirmation(customer, order.id, total, productsDetails);
    return { orderId: order.id, emailPreview };
  }
}