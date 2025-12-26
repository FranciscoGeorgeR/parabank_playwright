import { faker } from "@faker-js/faker";
import { User } from "./User";

export function buildUser(overrides?: Partial<User>): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const uniqueSuffix = Date.now().toString().slice(-5);

  return {
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username: `qa_chico_${lastName}`,
    password: "qa123",
    confirmPassword: "qa123",
    ...overrides,
  };
}
