const COLOR_STYLES = {
  "primary-02": {
    border: "border-primary-02",
    text: "text-primary-02",
  },
  white: {
    border: "border-white",
    text: "text-white",
  },
  // agrega más variantes si las necesitas
};

export const InventoryCardHeader = ({ title, color = "primary-02" }) => {
  const styles = COLOR_STYLES[color] || COLOR_STYLES["primary-02"];

  return (
    <div className={`${styles.border} rounded-2xl p-3 mb-4 border-2 w-full`}>
      <h2 className={`text-3xl font-bold ${styles.text}`}>
        {title}
      </h2>
    </div>
  );
};
