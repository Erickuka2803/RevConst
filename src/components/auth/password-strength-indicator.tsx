interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600">Force du mot de passe:</span>
        <span className={getStrengthColor(strength)}>{getStrengthLabel(strength)}</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getStrengthBarColor(
            strength
          )}`}
          style={{ width: `${strength * 25}%` }}
        />
      </div>
    </div>
  );
}

function getPasswordStrength(password: string): number {
  if (!password) return 0;

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;

  return strength;
}

function getStrengthLabel(strength: number): string {
  switch (strength) {
    case 0:
      return "Très faible";
    case 1:
      return "Faible";
    case 2:
      return "Moyen";
    case 3:
      return "Fort";
    case 4:
      return "Très fort";
    default:
      return "";
  }
}

function getStrengthColor(strength: number): string {
  switch (strength) {
    case 0:
    case 1:
      return "text-red-600";
    case 2:
      return "text-yellow-600";
    case 3:
      return "text-green-600";
    case 4:
      return "text-emerald-600";
    default:
      return "";
  }
}

function getStrengthBarColor(strength: number): string {
  switch (strength) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-yellow-500";
    case 3:
      return "bg-green-500";
    case 4:
      return "bg-emerald-500";
    default:
      return "";
  }
}