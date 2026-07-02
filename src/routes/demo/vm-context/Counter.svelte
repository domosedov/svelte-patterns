<script lang="ts">
	import { createVm } from './app-context.svelte'
	import { CounterVm } from './counter-vm.svelte'

	const props: { step?: number } = $props()

	const { vm } = createVm(CounterVm, () => ({ step: props.step }))
</script>

<button
	type="button"
	onclick={vm.increment}
	class="px-3 py-1 bg-orange-400 rounded hover:bg-orange-500"
>
	count: {vm.count} · doubled: {vm.doubled} · step: {props.step ?? 1}
</button>
