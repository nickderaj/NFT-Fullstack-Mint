import Link from 'next/link';

export interface IButton extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  title: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

// Reusable styled button with a primary and secondary variant, could add others like 'error' and 'warning' if needed
const LinkButton: React.FC<IButton> = ({ title, variant = 'primary', href }) => {
  const linkClasses = () => {
    const commonClasses = 'border hover:shadow-md px-4 py-1 text-center rounded-xl duration-300 transition-all';

    switch (variant) {
      case 'primary':
        return `bg-indigo-500 text-white hover:brightness-125 border-indigo-500 
          disabled:bg-neutral-500 disabled:border-neutral-500 ${commonClasses}`;
      case 'secondary':
        return `border-indigo-500 text-indigo-500 disabled:border-neutral-500
          disabled:text-neutral-500 ${commonClasses}`;
    }
  };

  return (
    <Link href={href} passHref>
      <a className={linkClasses()}>{title}</a>
    </Link>
  );
};

export default LinkButton;
