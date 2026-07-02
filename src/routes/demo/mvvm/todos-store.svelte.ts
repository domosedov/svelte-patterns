import { TodoModel, type Todo } from './todo-model.svelte'

export class TodosStore {
	todos = $state.raw<TodoModel[]>([])
	error = $state<Error | null>(null)
	fetchStatus = $state<'idle' | 'done' | 'fail' | 'pending'>('idle')

	isReady = $derived(this.fetchStatus === 'done' || this.fetchStatus === 'fail')

	loadTodos = async () => {
		this.fetchStatus = 'pending'
		this.error = null
		try {
			await new Promise((rs) => setTimeout(rs, 2_000))
			const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
			const data = (await res.json()) as Todo[]
			this.todos = data.map((todoDto) => new TodoModel(todoDto))
			this.fetchStatus = 'done'
		} catch (cause) {
			this.fetchStatus = 'fail'
			this.error = new Error('Не удалось загрузить список Todo', {
				cause
			})
		}
	}
}
