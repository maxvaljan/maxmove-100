
interface PrivacySectionProps {
  title: string;
  children: React.ReactNode;
}

export const PrivacySection = ({ title, children }: PrivacySectionProps) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">{title}</h2>
      {children}
    </section>
  );
};
