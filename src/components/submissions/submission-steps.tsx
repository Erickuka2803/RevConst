import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface Step {
  title: string;
  component: ReactNode;
}

interface SubmissionStepsProps {
  steps: Step[];
  currentStep: number;
}

export function SubmissionSteps({ steps, currentStep }: SubmissionStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`flex-1 ${
              index !== steps.length - 1 ? "border-b-2" : ""
            } ${
              index <= currentStep
                ? "border-primary-500 text-primary-600"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <motion.span
              className="text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {step.title}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}