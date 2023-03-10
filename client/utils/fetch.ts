interface SuccessResponse<T> {
	data: T
	success: true
}

interface ErrorResponse {
	error: string
	success: false
}

type Response<T> = SuccessResponse<T> | ErrorResponse

const API_BASE_URL = 'http://localhost:8080' as const

export async function Post<T>(
	path: `/${string}`,
	body: Record<string, unknown>
): Promise<Response<T>> {
	try {
		const res = await fetch(`${API_BASE_URL}${path}`, {
			body: JSON.stringify(body),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
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
