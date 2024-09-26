type getAllUsersType = {
  id: number;
  image: string;
  age: number;
  gender: string;
  ein: string;
  eyeColor: string;
  firstName: string;
  phone: string;
  role: string;
  ssn: string;
};

type getAllUserResponse = {
  limit: number;
  skip: number;
  total: number;
  users: getAllUsersType[];
};

export type { getAllUserResponse, getAllUsersType };
