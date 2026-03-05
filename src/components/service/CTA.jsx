import { Zap } from "lucide-react";
import { Button } from "../common/Button";

const CTA = () => {
  return (
    <div className="rounded-lg p-3 bg-primary md:p-8 mt-6 md:mt-16 max-w-5xl mx-auto md:rounded-3xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <span className="hidden md:flex md:justify-center md:items-center md:rounded-xl md:bg-white/30 md:w-14 md:h-14">
            <Zap size={30} />
          </span>

          <div className="text-center md:text-left">
            <h3 className="text-base md:text-xl font-semibold">
              Need a custom enterprise solution?
            </h3>
            <p className="text-sm md:text-base opacity-70">
              Contact us for a tailored plan that scales with your organization.
            </p>
          </div>
        </div>

        <Button
          type="button"
          className="h-10 px-6 text-accent rounded-xl bg-white font-semibold hover:bg-gray-300"
        >
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default CTA;
