import { getCakes } from "./actions";
import { CakesClient } from "./components/CakesClient";

export const dynamic = "force-dynamic";

export default async function AdminCakesPage() {
  const cakes = await getCakes();

  return <CakesClient initialCakes={cakes} />;
}
