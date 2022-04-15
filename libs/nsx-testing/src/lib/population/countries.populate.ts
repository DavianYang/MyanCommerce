import { CountryService } from '@myancommerce/nsx-country';
import { INestApplication } from '@nestjs/common';
import { initialData } from '../data/e2e-initial-data';

export async function populateCountries(app: INestApplication) {
    const countryService = app.get(CountryService);
    const countryData = initialData.countries;

    for (const country of countryData) {
        try {
            await countryService.create({
                data: { ...country, enabled: true },
            });
        } catch (e) {
            console.log(e);
        }
    }
}
