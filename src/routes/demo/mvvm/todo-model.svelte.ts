export type Todo = {
	id: number
	title: string
	completed: boolean
	userId: number
}

export class TodoModel {
	id: Todo['id']
	title: Todo['title']
	completed: Todo['completed']
	userId: Todo['userId']

	initialTitle: string

	constructor(todoDto: Todo) {
		this.id = todoDto.id
		this.title = $state(todoDto.title)
		this.initialTitle = todoDto.title
		this.completed = $state(todoDto.completed)
		this.userId = todoDto.userId
	}

	get isDirty() {
		return this.title !== this.initialTitle
	}
}
