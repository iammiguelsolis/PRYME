export const ProfileAvatar = ({ name = "" }) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-40 h-40 rounded-full bg-primary-01 flex items-center justify-center text-text-03 font-bold text-xl">
      {initials || "U"}
    </div>
  );
};
