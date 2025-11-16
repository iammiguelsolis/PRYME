export const DashboardCardHeader = ({ title }) => {
  return (
    <div className="border-primary-02 rounded-2xl p-3 mb-4 border-2">
      <h2 className="text-3xl font-bold text-primary-02">
        {title}
      </h2>
    </div>
  );
};
