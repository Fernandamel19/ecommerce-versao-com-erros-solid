import { IMailProvider } from '../providers/mailProvider';
import logger from '../lib/logger';
export class NotificationService {
  private mailProvider: IMailProvider;
  constructor(mailProvider: IMailProvider) {
    this.mailProvider = mailProvider;
  }
  async sendOrderConfirmation(customer: string, orderId: number, total: number, products: any[]) {
    const subject = `Confirmação do Pedido #${orderId}`;
    const text = `Olá, seu pedido #${orderId} no valor de R$ ${total} foi confirmado.`;
    const html = `
      <h1>Pedido Confirmado!</h1>
      <p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
      <p>Total: <strong>R$ ${total}</strong></p>
      <ul>${products.map(p => `<li>${p.name}</li>`).join('')}</ul>
    `;
    const preview = await this.mailProvider.sendMail(customer, subject, text, html);
    logger.info(`Email enviado: ${preview}`);
    return preview;
  }
}