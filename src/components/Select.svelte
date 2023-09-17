<script lang="ts">
	import { createCombobox, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox({
		forceVisible: true
	});

	async function search(input: string) {
		if (!input) return [];

		const response = await fetch('countries/', {
			method: 'POST',
			body: JSON.stringify({ search: input })
		});

		if (response.status !== 200) {
			throw new Error('An error occoured while searching. Please try again');
		}

		const results = await response.json();

		return results.countries;
	}

	let debouncing = false;
	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 300);
	};

	let filtered: Promise<any[]>;

	$: {
		if ($touchedInput) {
			debouncing = true;
			debounce(() => {
				filtered = search($inputValue);
				debouncing = false;
			});
		} else {
			filtered = Promise.resolve([]);
		}
	}
</script>

<div class="flex flex-col gap-4">
	<div>
		<label use:melt={$label} class="text-zinc-300">Select a country</label>
		<input
			use:melt={$input}
			placeholder="Start typing to search"
			class="px-2 py-4 border border-zinc-800 rounded shadow w-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-lightBlack"
		/>
	</div>
	<div class="relative">
		{#if $open && $inputValue}
			<ul
				class="z-10 flex max-h-[300px] flex-col overflow-hidden w-full shadow border rounded-md bg-lightBlack border-zinc-800"
				use:melt={$menu}
				transition:fly={{ duration: 150, y: -5 }}
			>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div
					class="flex max-h-full flex-col gap-0 overflow-y-auto divide-y divide-zinc-800 text-zinc-300"
					tabindex="0"
				>
					{#await filtered}
						<li>Searching</li>
					{:then items}
						{#each items as country, index (index)}
							<li
								use:melt={$option({
									value: country,
									label: country.name
								})}
								class={`relative cursor-pointer scroll-my-2 px-2 py-3 data-[highlighted]:bg-zinc-700 data-[disabled]:opacity-50 ${
									$isSelected(country) ? 'bg-zinc-700' : ''
								}`}
							>
								{country.name}
							</li>
						{:else}
							{#if $touchedInput && $inputValue && !debouncing}
								<li class="py-3 px-2">No results found</li>
							{/if}
						{/each}
					{:catch error}
						<li class="py-3 px-2">{error}</li>
					{/await}
				</div>
			</ul>
		{/if}
	</div>
</div>
