import {
  knex,
  verify_dj,
  get_djs,
  get_dj,
  add_dj,
  delete_dj,
} from "../lib/next-auth-utils";

const newUser = { email: "mmike@middlebury.edu", username: "Mike" };
beforeAll(async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();
});
describe("get_dj", () => {
  test("get_dj returns a dj matching the id", async () => {
    const dj = await get_dj(1);
    expect(dj.email).toEqual("anzigamasabo@middlebury.edu");
    expect(dj.username).toEqual("Assadou");
    expect(dj.id).toEqual(1);
  });
});
describe("get_djs", () => {
  test("get_djs returns array of all the djs", async () => {
    const dj_array = await get_djs();
    expect(dj_array[1].username).toEqual("Maja");
    expect(dj_array[3].email).toEqual("sscharf@middlebury.edu");
  });
});
describe("verify_dj", () => {
  test("verify_dj returns a user object if user is a dj", async () => {
    const user = "anzigamasabo@middlebury.edu";
    const returned_dj = await verify_dj(user);
    expect(returned_dj.id).toEqual(1);
  });
  test("verify_dj returns null if user is not a dj", async () => {
    const returned_dj = await verify_dj(newUser.email);
    expect(returned_dj).toBeNull();
  });
});
describe("add_dj", () => {
  test("add_dj adds dj to the database", async () => {
    const new_dj = await add_dj(newUser);
    expect(new_dj.id).toEqual(7);
  });
});

describe("delete_dj", () => {
  test("delete_dj removes the dj matching id from the database", async () => {
    const deleted = await delete_dj(1);

    expect(deleted).toEqual(true);
  });
});
