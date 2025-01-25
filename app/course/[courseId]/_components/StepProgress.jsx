import React from 'react';
import { Button } from '@/components/ui/button';

function StepProgress({ stepCount, setStepCount, data }) {
  return (
    <div className="flex  items-center gap-5">
      
        {/* Previous Button */}
        {stepCount != 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount - 1)}
          >
            Previous
          </Button>
        )}
          {data?.map((item, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full ${
                index < stepCount ? 'bg-primary' : 'bg-gray-200'
              }`}
            ></div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount + 1)}
          >
            Next
          </Button>
          </div>
    

  );
}

export default StepProgress;
