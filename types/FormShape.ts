export interface FormShape {
  people: People[];
  plates: Plate[];
  price: string;
  tip: string;
}

export interface People {
  name: string;
}

export interface Plate {
  name: string;
  price: string;
  eatenBy: any[];
}
