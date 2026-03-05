import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function BillingEditModal({ isOpen, setIsOpen, billing }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: billing });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setIsOpen(false);
  };

  const renderInput = (label, name, placeholder, type = "text") => (
    <div className="flex flex-col space-y-1">
      <label className="text-accent text-sm md:text-base font-medium">
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required` })}
        className="text-sm md:text-base border-accent/20 text-accent font-medium placeholder:text-accent/80 focus:border-primary focus:ring-primary"
      />
      {errors[name] && (
        <span className="text-red-500 text-xs">{errors[name].message}</span>
      )}
    </div>
  );

  useEffect(() => {
    reset(billing);
  }, [billing, reset, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-7xl max-h-[90vh] rounded-4xl bg-tertiary p-0 overflow-y-auto">
        <DialogHeader className="bg-tertiary border-primary/20 p-10 pb-4 top-0">
          <div className="relative">
            <DialogTitle className="text-2xl font-bold font-onest text-accent">
              Edit Billing Address
            </DialogTitle>

            <DialogClose asChild>
              <button
                className="absolute right-0 top-0 rounded-md p-2 text-accent/60 hover:text-accent hover:bg-accent/10 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {renderInput("Company Name", "companyName", "Enter company name")}
          {renderInput(
            "Billing Email",
            "billingEmail",
            "Enter billing email",
            "email"
          )}
          {renderInput("Address", "address", "Enter address")}
          {renderInput("City/State", "city", "Enter city or state")}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full sm:w-auto bg-primary text-md font-onest font-semibold hover:bg-primary/90 text-white"
            >
              Update Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
