export interface IEstablishmentEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  cnpj: string;
  description: string;
  status?: boolean;
  picture_url: string;
  background_picture_url?: string | null;
  category_id: string;
  created_at: Date;
  updated_at: Date;
}
