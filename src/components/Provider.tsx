'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const client = new QueryClient({});

function Provider({ children }) {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Provider;
							