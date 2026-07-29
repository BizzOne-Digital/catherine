import { redirect } from "next/navigation";

/** Legacy Botox URL → new Botox or Dysport treatment page */
export default function LegacyBotoxRedirect() {
  redirect("/services/injectables-wrinkle-relaxers/botox-or-dysport");
}
