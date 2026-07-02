import { TodosStore } from './todos-store.svelte'

export const filterOptions = {
	all: 'Все',
	completed: 'Завершенные',
	active: 'Активные'
} as const

export type Filter = keyof typeof filterOptions

export class PageVm {
	constructor() {
		console.log('Создаем инстанс VM')
	}

	pageTitle = $state('My Page')

	isTitleEditMode = $state(false)

	setPageTitle = (title: string) => {
		this.pageTitle = title
	}

	todosStore = new TodosStore()

	filter = $state<Filter>('all')

	setFilter = (filter: Filter) => {
		this.filter = filter
	}

	filteredTodos = $derived.by(() => {
		switch (this.filter) {
			case 'active': {
				return this.todosStore.todos.filter((t) => !t.completed)
			}
			case 'completed': {
				return this.todosStore.todos.filter((t) => t.completed)
			}
			default: {
				return this.todosStore.todos
			}
		}
	})

	#stopAnalytics?: () => void

	setupAnalytics = () => {
		console.log('Устанавливаем аналитику')
		this.#stopAnalytics = $effect.root(() => {
			$effect(() => {
				console.log('SEND ANALYTICS: [Фильтр изменен]: ', this.filter)
			})
		})
	}

	init = async () => {
		this.setupAnalytics()
		await this.todosStore.loadTodos()
	}

	dispose = () => {
		this.#stopAnalytics?.()
		console.log('Инстанс VM удален')
	}

	isReady = $derived.by(() => {
		return this.todosStore.isReady
	})
}
