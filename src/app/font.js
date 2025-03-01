import { Afacad_Flux, DM_Sans, Spectral, Poppins, Kanit } from "next/font/google";

export const afacad_flux = Afacad_Flux({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
export const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const spectral = Spectral({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

// Fonts optimized for used weights
export const dm_sans = DM_Sans({
  weight: ["400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const afacad_flux_400 = Afacad_Flux({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
