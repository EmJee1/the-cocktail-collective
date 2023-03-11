import { getUserToken } from '@/utils/local-storage'

interface ApiSuccessResponse<T> {
	data: T
	success: true
}

interface ApiErrorResponse {
	error: string
	success: false
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

const API_BASE_URL = 'http://localhost:8080' as const

export async function apiRequest<T>(
	path: `/${string}`,
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	body?: Record<string, unknown>
): Promise<ApiResponse<T>> {
	try {
		const token = getUserToken()

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		}
		if (token) {
			headers.authorization = `Bearer ${token}`
		}

		const res = await fetch(API_BASE_URL + path, {
			body: body ? JSON.stringify(body) : undefined,
			method,
			headers,
		})
		const json = await res.json()

		if (!res.ok) {
			return {
				success: false,
				error: json.error || res.statusText,
			}
		}

		return {
			success: true,
			data: json,
		}
	} catch (err) {
		return {
			error: err instanceof Error ? err.message : 'Onbekende fout',
			success: false,
		}
	}
}
