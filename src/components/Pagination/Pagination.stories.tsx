import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "./Pagination";

export const PaginationStory = {
  title: "Components/Pagination",
  component: Pagination,
};

export const Default = (args: React.ComponentProps<typeof Pagination>) => (
  <Pagination {...args}>
    <PaginationContent>
      <PaginationPrevious />
      <PaginationItem>
        <PaginationLink href="#" isActive>
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>
        <PaginationLink href="#">10</PaginationLink>
      </PaginationItem>
      <PaginationNext />
    </PaginationContent>
  </Pagination>
);

Default.args = {
  className: "",
};
