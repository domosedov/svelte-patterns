<script lang="ts">
	import VmProvider from '$lib/vm/VmProvider.svelte'
	import { AppContext, setVmContext } from './app-context.svelte'
	import Counter from './Counter.svelte'

	const app = new AppContext()

	let step = $state(1)
	let visible = $state(true)
</script>

<div class="container mx-auto px-4 flex flex-col gap-4">
	<h1 class="font-bold text-lg">Демо: createVmContext</h1>

	<div class="flex items-center flex-wrap gap-4">
		<label>
			step:
			<input type="number" bind:value={step} min="1" class="border px-2 py-1 w-20" />
		</label>

		<label>
			<input type="checkbox" bind:checked={visible} />
			показать счётчик
		</label>
	</div>

	<VmProvider context={app} set={setVmContext}>
		{#if visible}
			<Counter {step} />
		{/if}
	</VmProvider>

	<div>
		<h2 class="font-bold">Лог (из контекста)</h2>
		<ul class="text-sm font-mono flex flex-col gap-y-1">
			{#each app.log as entry, i (i)}
				<li>{entry}</li>
			{/each}
		</ul>
	</div>
</div>
