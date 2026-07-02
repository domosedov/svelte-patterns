import { untrack } from 'svelte'
import type { ViewModel } from '$lib/vm/vmContext.svelte'
import type { AppContext } from './app-context.svelte'

type CounterProps = { step?: number }

export class CounterVm implements ViewModel {
	count = $state(0)
	doubled = $derived(this.count * 2)

	readonly context: AppContext
	readonly props: CounterProps

	constructor(context: AppContext, props: CounterProps) {
		this.context = context
		this.props = props

		// аналог autorun из MobX — уничтожается вместе с компонентом,
		// массив autorunDisposers больше не нужен;
		// запись в log оборачиваем в untrack: push читает log.length,
		// без untrack эффект зависел бы от собственной записи и зациклился
		$effect(() => {
			const count = this.count
			untrack(() => this.context.track(`count = ${count}`))
		})
	}

	increment = () => {
		this.count += this.props.step ?? 1
	}

	afterMount() {
		this.context.track('CounterVm.afterMount')
	}

	beforeUnmount() {
		this.context.track('CounterVm.beforeUnmount')
	}
}
