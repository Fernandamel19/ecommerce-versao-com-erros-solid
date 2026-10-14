export interface Product {
  id: number;
  name: string;
  price: number;
  calculateFreight(): number;
}
export class PhysicalProduct implements Product {
  constructor(public id: number, public name: string, public price: number) {}
  calculateFreight() { return 10; }
}
export class DigitalProduct implements Product {
  constructor(public id: number, public name: string, public price: number) {}
  calculateFreight() { return 0; }
}
export class ProductFactory {
  static createProduct(data: any): Product {
    if (data.type === 'physical') return new PhysicalProduct(data.id, data.name, data.price);
    if (data.type === 'digital') return new DigitalProduct(data.id, data.name, data.price);
    throw new Error('Tipo de produto desconhecido');
  }
}