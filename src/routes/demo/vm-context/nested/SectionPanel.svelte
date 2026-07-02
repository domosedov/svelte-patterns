<script lang="ts">
	import type { Snippet } from 'svelte'
	import { getSection } from './section-context.svelte'

	let { title, children }: { title: string; children?: Snippet } = $props()

	// ближайший контекст вверх по дереву — как в React
	const section = getSection()
</script>

<section
	style="background: {section.color}"
	class="p-3 rounded flex flex-col items-start gap-2 border"
>
	<h2 class="font-bold">
		{title} — контекст «{section.label}», кликов: {section.clicks}
	</h2>
	<button type="button" onclick={section.increment} class="px-2 py-0.5 bg-white border rounded">
		+1 в контекст «{section.label}»
	</button>
	{#if children}
		{@render children()}
	{/if}
</section>
