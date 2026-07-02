<script lang="ts">
	import { onMount } from 'svelte'
	import { filterOptions, PageVm } from './page-vm.svelte'
	import { setPageVm } from './context'
	import TitleDialog from './TitleDialog.svelte'

	const vm = new PageVm()

	setPageVm(vm)

	onMount(() => {
		vm.init()

		return () => vm.dispose()
	})
</script>

<div class="container mx-auto px-4">
	<div class="flex items-center gap-2 flex-wrap">
		<h1 class="font-bold text-lg">{vm.pageTitle}</h1>
		<button
			type="button"
			onclick={() => (vm.isTitleEditMode = true)}
			class="text-xs px-1 py-0.5 bg-orange-400">Edit</button
		>
	</div>
	<TitleDialog />
	<div class="border border-dashed flex items-center flex-wrap gap-4">
		{#each Object.entries(filterOptions) as [key, label] (key)}
			<label><input type="radio" bind:group={vm.filter} value={key} /> {label}</label>
		{/each}
	</div>
	{#if vm.isReady}
		<ul class="flex flex-col gap-y-2">
			{#each vm.filteredTodos as todo (todo.id)}
				<li>
					<span>
						{todo.id}:
					</span>
					<input type="checkbox" bind:checked={todo.completed} />
					<input type="text" bind:value={todo.title} />
					{#if todo.isDirty}
						<span class="text-sm bg-yellow-300 text-yellow-700 px-1 py-0.5 rounded-sm">
							Изменен
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="bg-blue-300 text-blue-700 px-4 py-1 rounded animate-pulse">
			Подготавливаем страницу...
		</div>
	{/if}
</div>
