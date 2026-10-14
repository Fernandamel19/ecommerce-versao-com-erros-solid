import logger from '../lib/logger';
export interface IPaymentMethod {
  process(details: any): void;
}
export class CreditCardPayment implements IPaymentMethod {
  process(details: any) {
    logger.info(`Processando cartão final ${details.cardNumber.slice(-4)}`);
    if (details.cvv === '000') throw new Error('Cartão recusado');
  }
}
export class DebitCardPayment implements IPaymentMethod {
  process() { logger.info('Processando débito...'); }
}

export class PixPayment implements IPaymentMethod {
  process() { logger.info('Processando Pix...'); }
}
export const paymentMethods: Record<string, IPaymentMethod> = {
  credit_card: new CreditCardPayment(),
  debit_card: new DebitCardPayment(),
  pix: new PixPayment(),
};