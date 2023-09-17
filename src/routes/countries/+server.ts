import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COUNTRIES = [
	{ name: 'United States', code: 'US' },
	{ name: 'Canada', code: 'CA' },
	{ name: 'Mexico', code: 'MX' },
	{ name: 'United Kingdom', code: 'UK' },
	{ name: 'France', code: 'FR' },
	{ name: 'Germany', code: 'DE' },
	{ name: 'Spain', code: 'ES' },
	{ name: 'Italy', code: 'IT' },
	{ name: 'Japan', code: 'JP' },
	{ name: 'China', code: 'CN' },
	{ name: 'Russia', code: 'RU' },
	{ name: 'India', code: 'IN' },
	{ name: 'Brazil', code: 'BR' },
	{ name: 'Australia', code: 'AU' },
	{ name: 'South Africa', code: 'ZA' },
	{ name: 'Argentina', code: 'AR' },
	{ name: 'New Zealand', code: 'NZ' },
	{ name: 'South Korea', code: 'KR' },
	{ name: 'Sweden', code: 'SE' },
	{ name: 'Norway', code: 'NO' },
	{ name: 'Denmark', code: 'DK' },
	{ name: 'Finland', code: 'FI' },
	{ name: 'Iceland', code: 'IS' },
	{ name: 'Netherlands', code: 'NL' },
	{ name: 'Belgium', code: 'BE' },
	{ name: 'Switzerland', code: 'CH' },
	{ name: 'Austria', code: 'AT' },
	{ name: 'Ireland', code: 'IE' },
	{ name: 'Portugal', code: 'PT' },
	{ name: 'Greece', code: 'GR' }
];

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const { search } = body;

	const filtered = COUNTRIES.filter((country) =>
		country.name.toLowerCase().includes(search.toLowerCase())
	);

	return json(
		{
			countries: filtered
		},
		{
			status: 200
		}
	);
};
