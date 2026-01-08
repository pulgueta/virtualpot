import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@virtualpot/ui/button";

import { useUsers } from "@/hooks/use-users";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { data: users } = useUsers();

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-black text-3xl">Hello World</h1>
      <Button>Click me</Button>

      {users?.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </main>
  );
}
