export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  website: string;
  address: Address;
  company: Company;
};

export type Address = {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: Geo;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};
