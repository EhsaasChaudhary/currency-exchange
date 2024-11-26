"use server";
import type { ExchangeRatesResponse } from "@/types/exchangeRates";



/**`
 * @returns A Promise resolving to the latest exchange rates.
 */
export async function getLatestExchangeRates(): Promise<ExchangeRatesResponse> {
  try {
    const url = `${process.env.API_BASE_URL}/latest?access_key=${process.env.API_ACCESS_KEY}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 * 24 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch latest exchange rates. Status: ${response.status}`
      );
    }

    const data: ExchangeRatesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching latest exchange rates:", error);
    throw error;
  }
}

/**
 * Fetches historical exchange rates for a specific date for all currencies.
 * @param date - The date in YYYY-MM-DD format (e.g., "2024-03-19").
 * @returns A Promise resolving to the historical exchange rates for the given date.
 */
export async function getHistoricalExchangeRates(
  date: string
): Promise<ExchangeRatesResponse> {
  try {
    const url = `${process.env.API_BASE_URL}/${date}?access_key=${process.env.API_ACCESS_KEY}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 * 24 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch exchange rates for ${date}. Status: ${response.status}`
      );
    }

    const data: ExchangeRatesResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching exchange rates for ${date}:`, error);
    throw error;
  }
}
