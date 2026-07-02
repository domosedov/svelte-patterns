import { createVmContext } from '$lib/vm/vmContext.svelte'

export class SectionContext {
	readonly label: string
	readonly color: string
	clicks = $state(0)

	constructor(label: string, color: string) {
		this.label = label
		this.color = color
	}

	increment = () => {
		this.clicks += 1
	}
}

export const { setVmContext: setSection, getVmContext: getSection } =
	createVmContext<SectionContext>()
