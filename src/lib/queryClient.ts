import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Cacheo agresivo para resiliencia en conexiones inestables
                staleTime: 5 * 60 * 1000,      // 5 minutos: datos "frescos"
                gcTime: 10 * 60 * 1000,         // 10 minutos: en memoria
                refetchOnWindowFocus: false,     // No re-fetcha al enfocar ventana
                refetchOnReconnect: true,        // Sí re-fetcha al reconectar
                retry: 2,                        // 2 reintentos en error
                retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
            },
        },
    });
}
