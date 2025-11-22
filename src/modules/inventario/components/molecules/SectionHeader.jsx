export const SectionHeader = ({ title }) => {
  return (
    <div className="border border-primary-01 rounded-lg p-3 mb-4">
      <h2 className="text-xl font-bold text-primary-01">
        {title}
      </h2>
    </div>
  );
};