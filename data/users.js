import fs from "fs";

const usersFile = "./data/users.json";

export const getUsers = () => {
  const data = fs.readFileSync(usersFile, "utf-8");

  return JSON.parse(data);
};

export const saveUsers = (users) => {
  fs.writeFileSync(
    usersFile,
    JSON.stringify(users, null, 2)
  );
};


