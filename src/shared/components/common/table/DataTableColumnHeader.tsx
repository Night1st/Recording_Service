import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, Settings2Icon } from 'lucide-react';

import { Button } from '@/shared/components/common/ui/button';
import { cn } from '@/shared/utils/tailwind/functions';
import classNames from 'classnames';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  defaultFilter?: any;
  defaultSort?: any;
}

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
  defaultFilter,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const itemClassName = 'p-2 rounded-md flex gap-2 items-center hover:bg-foreground/5 cursor-pointer';
  return (
    <div className={cn('flex flex-col items-center space-x-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className={classNames('-ml-3 h-8 data-[state=open]:bg-accent w-full flex justify-start', {
              'bg-primary/10': !!defaultFilter,
            })}
          >
            <span>{title}</span>
            <Settings2Icon className='ml-2 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='px-1 py-0'>
          <div onClick={() => column.toggleSorting(false)} className={itemClassName}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </div>
          <div onClick={() => column.toggleSorting(true)} className={itemClassName}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </div>
          {column.getCanHide() && (
            <div onClick={() => column.toggleVisibility(false)} className={itemClassName}>
              <EyeIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
              Hide
            </div>
          )}
        </PopoverContent>
      </Popover>
      <Input placeholder='Search...' value={column.getFilterValue() as string} onChange={(event) => column.setFilterValue(event.target.value)}/>
    </div>
  );
};

export default DataTableColumnHeader;
