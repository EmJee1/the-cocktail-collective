const enum LocalStorageKey {
	Token = 'token',
}

export function setUserToken(token: string) {
	localStorage.setItem(LocalStorageKey.Token, token)
}

export function getUserToken() {
	return localStorage.getItem(LocalStorageKey.Token)
}
