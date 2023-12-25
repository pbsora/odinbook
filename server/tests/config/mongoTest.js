const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const { users, usersId } = require("./testUsers");
const User = require("../../models/User");

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });

  const Users = await Promise.all(
    users.map(async (user) => {
      return new User(user);
    })
  );
  const ids = Users.map((user) => user.id);
  await User.insertMany([...Users]);
  usersId.push(...ids);
});

afterAll(async () => {
  await mongoose.connection.close();
});
