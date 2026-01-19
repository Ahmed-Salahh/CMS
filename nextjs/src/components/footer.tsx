import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3f4b76] flex items-center justify-between px-11 py-5">
      {/* Left Section */}
      <div className="flex gap-[30px] items-center">
        {/* Logo */}
        <div className="flex items-center overflow-hidden">
          <div className="h-10 w-20 relative overflow-hidden">
            <Image
              src="/logo.png"
              alt="Altamayyuz Academy"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex gap-1 items-start">
          <Link
            href="/"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              Home
            </span>
          </Link>

          <Link
            href="/about"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              About Us
            </span>
          </Link>

          <Link
            href="/programs"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              Programs
            </span>
          </Link>

          <Link
            href="/media"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              Media
            </span>
          </Link>

          <Link
            href="/success-stories"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              Success Stories
            </span>
          </Link>

          <Link
            href="/faqs"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              FAQs
            </span>
          </Link>

          <Link
            href="/contact"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              Contact Us
            </span>
          </Link>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex gap-[30px] items-center">
        {/* Privacy Links */}
        <nav className="flex gap-1 items-start">
          <Link
            href="/privacy"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent opacity-50 hover:opacity-100 transition-opacity"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              Privacy Policy
            </span>
          </Link>

          <Link
            href="/complaints"
            className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-transparent opacity-50 hover:opacity-100 transition-opacity"
          >
            <span className="font-montserrat font-medium text-sm leading-5 tracking-[-0.084px]">
              Complaints & Suggestions
            </span>
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-2.5 items-center">
          {/* Twitter/X */}
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 flex gap-1 items-center justify-center overflow-hidden p-2.5 rounded-[10px] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.751 2.5H18.419L12.378 9.52L19.5 17.5H14.042L9.734 12.196L4.791 17.5H2.122L8.582 10.002L1.75 2.5H7.336L11.225 7.312L15.751 2.5ZM14.828 16.002H16.376L6.503 4.092H4.831L14.828 16.002Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 flex gap-1 items-center justify-center overflow-hidden p-2.5 rounded-[10px] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3333 3.33333C16.7754 3.33333 17.1993 3.50893 17.5118 3.82149C17.8244 4.13405 18 4.55797 18 5V15C18 15.442 17.8244 15.866 17.5118 16.1785C17.1993 16.4911 16.7754 16.6667 16.3333 16.6667H5.66667C5.22464 16.6667 4.80072 16.4911 4.48816 16.1785C4.17559 15.866 4 15.442 4 15V5C4 4.55797 4.17559 4.13405 4.48816 3.82149C4.80072 3.50893 5.22464 3.33333 5.66667 3.33333H16.3333ZM15.8333 14.5V10.5C15.8333 9.70435 15.5173 8.94129 14.9547 8.37868C14.3921 7.81607 13.629 7.5 12.8333 7.5C12.05 7.5 11.1667 7.95 10.7333 8.625V7.66667H8.4V14.5H10.7333V10.825C10.7333 10.1333 11.2917 9.56667 12 9.56667C12.3315 9.56667 12.6495 9.69821 12.8839 9.93202C13.1183 10.1658 13.25 10.4841 13.25 10.8167V14.5H15.8333ZM6.33333 6.5C6.73043 6.5 7.1087 6.34196 7.38721 6.06066C7.66572 5.77936 7.83333 5.39783 7.83333 5C7.83333 4.15833 7.15 3.46667 6.33333 3.46667C5.93623 3.46667 5.5547 3.62471 5.27619 3.90601C4.99768 4.18731 4.83333 4.56884 4.83333 4.96667C4.83333 5.80833 5.51667 6.5 6.33333 6.5ZM7.49167 14.5V7.66667H5.16667V14.5H7.49167Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
