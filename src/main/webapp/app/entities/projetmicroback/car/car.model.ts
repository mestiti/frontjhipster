export interface ICar {
  id?: string;
  marque?: string | null;
  prix?: number | null;
}

export class Car implements ICar {
  constructor(public id?: string, public marque?: string | null, public prix?: number | null) {}
}

export function getCarIdentifier(car: ICar): string | undefined {
  return car.id;
}
