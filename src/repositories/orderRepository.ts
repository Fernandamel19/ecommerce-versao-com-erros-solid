import { PrismaClient } from '@prisma/client';
export interface IOrderRepository {
  findProductById(id: number): Promise<any>;
  createOrder(data: { customer: string; items: string; total: number; status: string }): Promise<any>;
}
export class PrismaOrderRepository implements IOrderRepository {
  private prisma = new PrismaClient();
  findProductById(id: number){
    return this.prisma.product.findUnique({ where: {id} });
  }
  createOrder(data: { customer: string; items: string; total: number; status: string }) {
    return this.prisma.order.create({data});
  }
}