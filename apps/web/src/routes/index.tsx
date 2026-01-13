import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@virtualpot/ui/button";

import { useUsers, useUsersQueryOptions } from "@/hooks/use-users";

export const Route = createFileRoute("/")({
  component: App,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(useUsersQueryOptions),
});

function App() {
  const { data: users } = useUsers();

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-black text-3xl">Hello World</h1>
      <Button>Click me</Button>

      {/* @ts-expect-error - TODO: fix this type error */}
      {users?.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </main>
  );
}
