export default function UtilityBar() {
  return (
    <div className="bg-ink text-white text-xs md:text-sm">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-8 py-2">
        <div className="flex items-center gap-5 opacity-80 font-body">
          <a href="#" className="hover:text-concrete">About</a>
          <a href="#" className="hover:text-concrete">Careers</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:" className="font-display font-bold tracking-wide text-white">
            (000) 000-0000
          </a>
          <a href="#quote" className="hidden md:inline-flex font-display font-bold uppercase tracking-wide bg-concrete px-4 py-1.5 text-white rounded-[4px] hover:bg-concrete-deep">
            Get Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
