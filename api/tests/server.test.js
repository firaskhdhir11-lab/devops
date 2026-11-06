import { describe, it, expect, afterEach, vi } from "vitest";
import request from "supertest";
import { app, pool } from "../server.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Express API", () => {
  it("GET /api/health returns status 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.message).toBe(
      "DevSecOps Portfolio API is running"
    );
  });

  it("GET /api/profile returns profile information", async () => {
    const response = await request(app).get("/api/profile");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Firas Khdhir");
    expect(response.body.languages).toContain("Français");
  });

  it("GET /api/projects returns a list of projects", async () => {
    const response = await request(app).get("/api/projects");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("POST /api/contact rejects missing fields", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Validation failed");
  });

  it("POST /api/contact rejects invalid email and short message", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Firas",
        email: "invalid-email",
        message: "Short"
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Validation failed");
  });

  it("POST /api/contact rejects unexpected fields", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Firas",
        email: "firas@example.com",
        message: "This is a valid message",
        admin: true
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Validation failed");
  });

  it("POST /api/contact rejects malformed JSON", async () => {
    const response = await request(app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send('{"name":');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("POST /api/contact uses parameterized SQL against injection attempts", async () => {
    const payload = "'; DROP TABLE contacts; --";

    vi.spyOn(pool, "query").mockResolvedValue({
      rows: [{
        id: 1,
        name: payload,
        email: "firas@example.com",
        message: "This is a test message",
        created_at: new Date()
      }]
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: payload,
        email: "firas@example.com",
        message: "This is a test message"
      });

    expect(response.status).toBe(201);
    expect(pool.query).toHaveBeenCalled();

    const [sql, values] = pool.query.mock.calls[0];

    expect(sql).toContain("$1");
    expect(sql).toContain("$2");
    expect(sql).toContain("$3");
    expect(values).toContain(payload);
  });
});
