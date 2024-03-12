type IUserGender = "male" | "female";

export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  gender: IUserGender;
  cpf: string;
  password: string;
  picture_url: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
}
