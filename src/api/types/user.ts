type getAllUserResponse = {
  limit: number;
  skip: number;
  total: number;
  users: { id: number; age: number; image: string }[];
};

export type { getAllUserResponse };
