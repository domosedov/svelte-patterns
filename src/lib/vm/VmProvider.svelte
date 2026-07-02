<script lang="ts" generics="TContext">
	import type { Snippet } from 'svelte'

	let {
		context,
		set,
		children
	}: {
		context: TContext
		set: (context: TContext) => TContext
		children: Snippet
	} = $props()

	// инстанс контекста фиксируется на момент монтирования (как value у
	// React-провайдера); его внутреннее $state-состояние остаётся реактивным
	// svelte-ignore state_referenced_locally
	set(context)
</script>

{@render children()}
