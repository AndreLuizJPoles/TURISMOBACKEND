export interface IEstablishmentContactEntity {
  id: string;
  phone_number?: string | null;
  email?: string | null;
  establishment_id: string;
  created_at: Date;
  updated_at: Date;
}
