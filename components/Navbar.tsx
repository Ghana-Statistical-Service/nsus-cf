import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          
          <div className="flex items-center gap-3">

              <Image 
                src="/logo.png" 
                alt="Ghana flag" 
                width={60} height={60} 
                className="h-12 w-12 rounded-full" />
           
            <div className="flex flex-col leading-[0.6rem]">
                <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                    GHANA
                </span>
                <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                    STATISTICAL
                </span>
                <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                    SERVICE
                </span>
            </div>
          </div>
              <Image 
                src="/ghanaflag.png"
                alt="Ghana flag"
                width={60}
                height={32}
                className="rounded-full"
              />
        </div>
      </div>

  
      <div className="bg-brandPurple text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-4xl font-semibold tracking-wide">NSUs-CF</span>

          <nav className="flex items-center gap-8 text-sm font-medium">
            <a href="#matrix" className="hover:text-brandTeal">
              Conversion Matrix
            </a>
            <a href="#convert" className="hover:text-brandTeal">
              Convert
            </a>
            <a href="#about" className="hover:text-brandTeal">
              About
            </a>
            <a href="#help" className="hover:text-brandTeal">
              Help?
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
