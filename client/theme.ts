import { extendTheme } from "@chakra-ui/react";
import { lighten } from "@chakra-ui/theme-tools";

const Button = {
  baseStyles: {},
  sizes: {},
  variants: {
    black: {
      bg: "#000",
      _hover: {
        background: lighten("#000", 20),
      },
    },
  },
  defaultProps: {},
};

const theme = extendTheme({
  colors: {
    primary: "#424f61",
    secondary: "#323D4D",
  },
  components: {
    Button,
  },
});

export default theme;
