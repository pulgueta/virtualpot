import { Elysia, t } from "elysia";

// Mock data for demonstration
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "developer" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "designer" },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "manager",
  },
];

export const userRoutes = new Elysia({ prefix: "/users", tags: ["users"] })
  .get("/", () => users)
  .get(
    "/:id",
    ({ params: { id } }) => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
    {
      params: t.Object({
        id: t.String({ description: "User ID" }),
      }),
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
          email: t.String(),
          role: t.String(),
        }),
      },
    }
  )
  .post(
    "/",
    ({ body }) => {
      const newUser = {
        id: String(users.length + 1),
        ...body,
      };
      users.push(newUser);
      return newUser;
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, description: "User name" }),
        email: t.String({ format: "email", description: "User email" }),
        role: t.String({ description: "User role" }),
      }),
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
          email: t.String(),
          role: t.String(),
        }),
      },
    }
  );
