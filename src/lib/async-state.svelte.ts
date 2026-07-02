export class AsyncState<T> {
	data = $state.raw<T | null>(null)
	error = $state.raw<unknown>(null)
	loading = $state(false)

	async run(fn: () => Promise<T>): Promise<void> {
		this.loading = true
		this.error = null
		try {
			this.data = await fn()
		} catch (e) {
			this.error = e
		} finally {
			this.loading = false
		}
	}

	reset(): void {
		this.data = null
		this.loading = false
		this.error = null
	}
}
