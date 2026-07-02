<script lang="ts">
	import VmProvider from '$lib/vm/VmProvider.svelte'
	import { SectionContext, setSection } from './section-context.svelte'
	import SectionPanel from './SectionPanel.svelte'
</script>

<div class="container mx-auto px-4 flex flex-col gap-4">
	<h1 class="font-bold text-lg">Демо: вложенные контексты</h1>

	<VmProvider context={new SectionContext('внешний', '#e0f2fe')} set={setSection}>
		<SectionPanel title="Внешняя секция">
			<VmProvider context={new SectionContext('вложенный', '#fef3c7')} set={setSection}>
				<SectionPanel title="Вложенная секция">
					<VmProvider context={new SectionContext('глубокий', '#fce7f3')} set={setSection}>
						<SectionPanel title="Глубокая секция" />
					</VmProvider>
				</SectionPanel>
			</VmProvider>
		</SectionPanel>

		<SectionPanel title="Соседняя панель (тот же провайдер)" />
	</VmProvider>
</div>
