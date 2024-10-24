import { stripe } from "~/lib/stripe";

export async function getNipNumber() {
  const { data: taxIds } = await stripe.taxIds.list();

  const taxId = taxIds.find((taxId) => taxId.country === COUNTRY_CODE);

  return taxId.value.replace(COUNTRY_CODE, "");
}

const COUNTRY_CODE = "PL";
