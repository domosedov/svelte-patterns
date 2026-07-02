<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import { resolve } from '$app/paths'

	let { children } = $props()
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav class="flex items-center flex-wrap gap-4 container mx-auto">
	<a href={resolve('/')} class="text-blue-500 hover:underline">Home</a>
	<a href={resolve('/demo/mvvm')} class="text-blue-500 hover:underline">MVVM</a>
	<a href={resolve('/demo/vm-context')} class="text-blue-500 hover:underline">VM Context</a>
</nav>
{@render children()}
