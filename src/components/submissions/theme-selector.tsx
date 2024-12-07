import { THEMES } from "~/lib/constants";
import { FormField } from "~/components/ui/form/form-field";
import { FormLabel } from "~/components/ui/form/form-label";

interface ThemeSelectorProps {
  selectedThemes: string[];
  onChange: (themes: string[]) => void;
  error?: string;
}

export function ThemeSelector({ selectedThemes, onChange, error }: ThemeSelectorProps) {
  const handleThemeChange = (theme: string) => {
    const newThemes = selectedThemes.includes(theme)
      ? selectedThemes.filter((t) => t !== theme)
      : [...selectedThemes, theme];
    onChange(newThemes);
  };

  return (
    <FormField error={error}>
      <FormLabel required>Themes</FormLabel>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {THEMES.map((theme) => (
          <label key={theme} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedThemes.includes(theme)}
              onChange={() => handleThemeChange(theme)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">{theme}</span>
          </label>
        ))}
      </div>
    </FormField>
  );
}