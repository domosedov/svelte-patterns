import { getContext, onMount, setContext } from 'svelte'

export interface ViewModel {
	beforeMount?: () => void
	afterMount?: () => void
	beforeUnmount?: () => void
}

export function createVmContext<TContext>(options?: {
	beforeMount?: (context: TContext, vm?: unknown) => void
	afterMount?: (context: TContext, vm?: unknown) => void
	beforeUnmount?: (context: TContext, vm?: unknown) => void
}) {
	const key = Symbol('vm-context')

	function setVmContext(context: TContext): TContext {
		setContext(key, context)
		return context
	}

	function getVmContext(): TContext {
		const context = getContext<TContext>(key)

		options?.beforeMount?.(context)
		onMount(() => {
			options?.afterMount?.(context)
			return () => options?.beforeUnmount?.(context)
		})

		return context
	}

	// пропсы принимаются thunk'ом (() => props), а VM получает live-объект:
	// каждое чтение свойства идёт через актуальные пропсы компонента,
	// поэтому реактивность сохраняется без ручной синхронизации
	function liveProps(getProps: () => object) {
		return new Proxy(
			{},
			{
				get: (_, prop) => Reflect.get(getProps(), prop),
				has: (_, prop) => Reflect.has(getProps(), prop),
				ownKeys: () => Reflect.ownKeys(getProps()),
				getOwnPropertyDescriptor: (_, prop) => Object.getOwnPropertyDescriptor(getProps(), prop)
			}
		)
	}

	function createVm<TVm extends new (context: TContext) => ViewModel>(
		VM: TVm
	): { vm: InstanceType<TVm>; context: TContext }
	function createVm<TVm extends new (context: TContext, props: never) => ViewModel>(
		VM: TVm,
		getProps: () => ConstructorParameters<TVm>[1]
	): { vm: InstanceType<TVm>; context: TContext }
	function createVm(
		VM: new (context: TContext, props?: unknown) => ViewModel,
		getProps?: () => unknown
	) {
		const context = getContext<TContext>(key)

		const vm = new VM(context, getProps ? liveProps(getProps as () => object) : undefined)
		options?.beforeMount?.(context, vm)
		vm.beforeMount?.()

		onMount(() => {
			options?.afterMount?.(context, vm)
			vm.afterMount?.()

			return () => {
				options?.beforeUnmount?.(context, vm)
				vm.beforeUnmount?.()
			}
		})

		return { context, vm }
	}

	return { setVmContext, getVmContext, createVm }
}
