import express from 'express';
import { OrderController } from './controllers/OrderController';
import { OrderService } from './services/orderService';
import { NotificationService } from './services/notificationService';
import { PrismaOrderRepository } from './repositories/orderRepository';
import { EtherealMailProvider } from './providers/mailProvider';
import { paymentMethods } from './payments/paymentMethods';

const app = express();
app.use(express.json());


const orderRepository = new PrismaOrderRepository();
const mailProvider = new EtherealMailProvider();
const notificationService = new NotificationService(mailProvider);
const orderService = new OrderService(orderRepository, notificationService, paymentMethods);
const orderController = new OrderController(orderService);

app.post('/orders', (req, res) => orderController.processOrder(req, res));

export default app;