export interface IEstablishmentEntity {
  id: string;
  name: string;
  cnpj: string;
  description: string;
  status?: boolean;
  picture_url: string;
  background_picture_url?: string | null;
  category_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
