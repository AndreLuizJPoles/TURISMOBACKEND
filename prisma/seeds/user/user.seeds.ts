import { User } from "@prisma/client";
import { PasswordHashAdapter } from "../../../src/adapters/utils/passwordHash.adapter";
import { randomUUID } from "crypto";

const passwordHashAdapter = new PasswordHashAdapter();

export const userSeeds = async (): Promise<User[]> => {
  return [
    {
      id: randomUUID(),
      name: "ADMIN 1",
      email: "admin1@email.com",
      gender: null,
      cpf: null,
      picture_url: "https://example.com/admin1.jpg",
      phone_number: null,
      password: await passwordHashAdapter.hash("123456789"),
      birthdate: new Date("1990-01-01"),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: randomUUID(),
      name: "ADMIN 2",
      email: "admin2@example.com",
      gender: null,
      cpf: null,
      picture_url: "https://example.com/admin2.jpg",
      phone_number: null,
      password: await passwordHashAdapter.hash("123456789"),
      birthdate: new Date("1985-05-15"),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: randomUUID(),
      name: "ADMIN 3",
      email: "admin3@example.com",
      gender: null,
      cpf: null,
      picture_url: "https://example.com/admin3.jpg",
      phone_number: null,
      password: await passwordHashAdapter.hash("123456789"),
      birthdate: new Date("1978-11-30"),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
};
