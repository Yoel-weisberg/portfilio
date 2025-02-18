import Link from "next/link"

const MobileNavBarItem = ({ href, Text, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex w-full items-center py-2 text-lg font-semibold dark:text-white"
    >
      {Text}
    </Link>
  );
};

export default MobileNavBarItem;