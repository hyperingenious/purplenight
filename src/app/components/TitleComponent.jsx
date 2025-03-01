import { Title, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { spectral } from "../font";
import { dark_theme } from "../config/theme";


const TitleComponent = ({ children, order = 1, style = {} }) => {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const color = colorScheme === "dark" ? dark_theme.main_text_color : theme.colors.gray[9];
  return (
    <Title c={color} style={{ ...style }} className={spectral.className} fw={500} order={order}>
      {children}
    </Title>
  );
};

export default TitleComponent;
