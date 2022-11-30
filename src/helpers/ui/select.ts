import { Theme } from "react-select";

export function getTheme(): (theme: Theme) => Theme {
  return (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "var(--background-darker)",
      neutral0: "var(--background-lighter)",
      neutral80: "var(--color-primary)",
      neutral90: "var(--color-primary)",
    },
  });
}
