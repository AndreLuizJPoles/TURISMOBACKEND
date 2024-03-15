export interface IAddressEntity {
  id: string;
  city: string;
  street: string;
  number: number;
  neighborhood: string;
  complement?: string;
  zip_code: string;
  user_id?: string;
  establishment_id?: string;
  created_at: Date;
  updated_at: Date;
}
