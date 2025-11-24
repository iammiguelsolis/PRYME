export const DashboardCardHeader = ({ title, color="primary-02" }) => {
  
  const firstClassName = `border-${color} rounded-2xl p-3 mb-4 border-2 w-full`;
  const secondClassName = `text-3xl font-bold text-${color} `;

  return (
    <div className={firstClassName}>
      <h2 className={secondClassName}>
        {title}
      </h2>
    </div>
  );
};
