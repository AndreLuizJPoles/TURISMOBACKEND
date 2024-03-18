type IUserGender = "male" | "female";

export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  gender?: IUserGender | null;
  cpf?: string | null;
  password: string;
  picture_url: string;
  phone_number?: string | null;
  birthdate: Date;
  created_at: Date;
  updated_at: Date;
}
