import { createVmContext } from '$lib/vm/vmContext.svelte'

export class AppContext {
	log = $state<string[]>([])

	track(event: string) {
		this.log.push(event)
	}
}

export const { setVmContext, getVmContext, createVm } = createVmContext<AppContext>({
	afterMount: (context, vm) => {
		context.track(`options.afterMount (vm: ${vm ? vm.constructor.name : '—'})`)
	},
	beforeUnmount: (context, vm) => {
		context.track(`options.beforeUnmount (vm: ${vm ? vm.constructor.name : '—'})`)
	}
})
