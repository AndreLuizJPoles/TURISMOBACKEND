export interface IAddressEntity {
  id: string;
  city: string;
  street: string;
  number: number;
  neighborhood: string;
  complement?: string | null;
  zip_code: string;
  state: string;
  country: string;
  user_id?: string | null;
  establishment_id?: string | null;
  created_at: Date;
  updated_at: Date;
}
