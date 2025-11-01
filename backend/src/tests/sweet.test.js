const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Sweet = require("../models/Sweet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

beforeEach(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});

  // Create test user
  const hashedPassword = await bcrypt.hash("123456", 10);
  const user = await User.create({
    name: "Sweet Tester",
    email: "sweet@test.com",
    password: hashedPassword
  });

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
});

let token;

describe("Sweet Tests", () => {
  test("Add a sweet should return sweet object", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Kaju Katli",
        category: "Barfi",
        price: 250,
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Kaju Katli");
  });
});


test("Get sweets should return array", async () => {
  // Insert a sample sweet
  await Sweet.create({
    name: "Gulab Jamun",
    category: "Dessert",
    price: 150,
    quantity: 20
  });

  const res = await request(app).get("/api/sweets");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});


test("Search sweets should return filtered results", async () => {
  // Insert sample sweets
  await Sweet.create([
    { name: "Rasgulla", category: "Bengali", price: 100, quantity: 50 },
    { name: "Kaju Katli", category: "Barfi", price: 250, quantity: 20 }
  ]);

  const res = await request(app)
    .get("/api/sweets/search?name=Kaju")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe("Kaju Katli");
});

test("Update a sweet should modify its details", async () => {
  // Create a sweet
  const sweet = await Sweet.create({
    name: "Ladoo",
    category: "Indian",
    price: 100,
    quantity: 30
  });

  const res = await request(app)
    .put(`/api/sweets/${sweet._id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Motichoor Ladoo",
      price: 150
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("Motichoor Ladoo");
  expect(res.body.price).toBe(150);
});

test("Admin should delete a sweet", async () => {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await User.create({
    name: "Admin User",
    email: "admin@test.com",
    password: adminPassword,
    role: "admin"
  });

  const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

  // Create sweet
  const sweet = await Sweet.create({
    name: "Jalebi",
    category: "Indian",
    price: 60,
    quantity: 100
  });

  // Try to delete
  const res = await request(app)
    .delete(`/api/sweets/${sweet._id}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Sweet deleted");
});

test("User should purchase a sweet and reduce quantity", async () => {
  const sweet = await Sweet.create({
    name: "Sandesh",
    category: "Bengali",
    price: 120,
    quantity: 5
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${token}`)
    .send({ qty: 1 });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(4); // 5 - 1 = 4
});

test("Admin should restock a sweet and increase quantity", async () => {
  // Create admin
  const adminPassword = await bcrypt.hash("adminpass", 10);
  const admin = await User.create({
    name: "Admin User 2",
    email: "admin2@test.com",
    password: adminPassword,
    role: "admin"
  });

  const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

  // Create sweet
  const sweet = await Sweet.create({
    name: "Barfi",
    category: "Indian",
    price: 200,
    quantity: 10
  });

  // Call restock
  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/restock`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ qty: 5 });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(15); // 10 + 5 = 15
});
