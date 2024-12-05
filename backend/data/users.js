import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  },
  {
    name: "User First",
    email: "first@email.com",
    password: bcrypt.hashSync("121212", 10),
    isAdmin: false,
  },
  {
    name: "User Second",
    email: "second@email.com",
    password: bcrypt.hashSync("131313", 10),
    isAdmin: false
  },
];
export default users;
