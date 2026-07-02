<script lang="ts">
	import { Dialog } from 'bits-ui'
	import { getPageVm } from './context'

	const vm = getPageVm()
</script>

<Dialog.Root bind:open={vm.isTitleEditMode}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 bg-black/50" />
		<Dialog.Content
			class="fixed p-6 rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-lg bg-white"
		>
			<Dialog.Title>Change page title</Dialog.Title>
			<input type="text" bind:value={vm.pageTitle} class="border p-2" />
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
