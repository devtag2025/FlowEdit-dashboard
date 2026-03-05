import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import React from "react";

const Contracts = () => {
  return (
    <main className="min-h-screen pt-2 px-3 md:px-8 md:py-5 pb-10 ">
      <Card className="bg-tertiary rounded-xl md:rounded-3xl">
        <CardContent className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-accent font-bold text-xl md:text-3xl">
              Contract
            </h1>

            <span className="text-sm md:text-base bg-green-300 py-2 px-4 rounded-full font-bold text-green-700">
              Status: Active
            </span>
          </div>

          <p className="text-slate-700 md:px-2 text-justify">
            This Contractor Agreement outlines the terms and conditions between
            FlowEdit and the contractor for services rendered. The agreement
            includes provisions for project scope, payment terms, intellectual
            property rights, confidentiality obligations, and termination
            clauses. Both parties agree to maintain professional standards and
            meet all deadlines as specified in individual project briefs.
          </p>

          <p className="text-slate-700 md:px-2 text-justify">
            The contractor agrees to provide high-quality work that meets or
            exceeds client expectations, while FlowEdit commits to timely
            payment for completed projects and providing necessary resources and
            access to tools. This agreement is effective from the signing date
            and remains active unless terminated by either party with
            appropriate notice.
          </p>

          <div className="flex flex-col md:flex-row gap-5">
            <Button className=" flex items-center justify-center gap-2 bg-primary px-6 py-3 rounded-full shadow-lg text-base font-medium  text-white hover:shadow-xl">
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
              View Contract (PDF)
            </Button>
            <Button className="flex items-center justify-center gap-2 px-6 py-3 border border-primary rounded-full font-bold text-primary hover:bg-primary hover:text-white">
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Download Contract
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Contracts;
