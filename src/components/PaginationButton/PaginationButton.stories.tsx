import React from 'react';
import type { Story } from "@ladle/react";
import { PaginationButtonLeft, PaginationButtonRight } from './PaginationButton';

export const BasicPaginationButton: Story = () => {
  return (
    <div className="flex h-20 w-full bg-gray-500 rounded-md">
      <PaginationButtonLeft onClick={() => alert('Button clicked!')} className="bg-red-500"/>
    </div>
  );
};