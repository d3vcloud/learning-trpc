import { useState } from 'react';
import { trpc } from './utils/trpc';
import { QueryClient, QueryClientProvider } from 'react-query';
import Store from './components/store';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3000/trpc'
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Store />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
