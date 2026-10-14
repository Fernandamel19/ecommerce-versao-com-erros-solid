import { Request, Response } from 'express';
import { OrderService, ValidationError } from '../services/orderService';
import logger from '../lib/logger';
export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async processOrder(req: Request, res: Response) {
    try {
      const { customer, items, paymentMethod, paymentDetails } = req.body;
      const result = await this.orderService.placeOrder(customer, items, paymentMethod, paymentDetails);

      return res.json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview,
      });
    } catch (error: any) {
      logger.error(`Erro ao processar pedido: ${error.message}`);

      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}