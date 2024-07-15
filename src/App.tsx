import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/routes.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Office } from "./utils/types.ts";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface HistoryState {
    bookingState: { office: Office };
  }
}

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
