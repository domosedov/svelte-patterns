import { createContext } from 'svelte'
import type { PageVm } from './page-vm.svelte'

export const [getPageVm, setPageVm] = createContext<PageVm>()
