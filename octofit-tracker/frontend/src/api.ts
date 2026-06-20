/**
 * API Configuration Utility
 * 
 * Constructs the base API URL based on environment:
 * - Codespaces: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api
 * - Local: http://localhost:8000/api
 * 
 * Requires VITE_CODESPACE_NAME to be defined in .env.local for Codespaces mode
 */

export type ApiResponse = 
  | unknown[] 
  | { data: unknown; [key: string]: unknown };


export function getApiBaseUrl(): string {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  return 'http://localhost:8000/api';
}

export function extractArrayFromResponse(response: ApiResponse): unknown[] {
  return Array.isArray(response) ? response : (response.data as unknown[]) || [];
}

export async function fetchFromApi(endpoint: string): Promise<ApiResponse> {
  const url = `${getApiBaseUrl()}${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return (await response.json()) as ApiResponse;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

export async function postToApi(endpoint: string, data: unknown): Promise<ApiResponse> {
  const url = `${getApiBaseUrl()}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return (await response.json()) as ApiResponse;
  } catch (error) {
    console.error(`Failed to post to ${url}:`, error);
    throw error;
  }
}
