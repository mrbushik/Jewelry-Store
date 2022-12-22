export interface productItem {
  category: string;
  imageLink: string;
  metal: string;
  price: string;
  title: string;
  type: string;
}
export interface filterProduct {
  price: filterPrice | any;
  filter: productFilters;
}

export interface filterPrice {
  name: string;
  value: boolean;
}

export interface productFilters {
  text: string;
  value: string;
}

export interface fieldTarget {
  name: string;
  value: any;
}
