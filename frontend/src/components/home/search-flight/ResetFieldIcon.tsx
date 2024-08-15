import { useController } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';
import { cn } from '@/lib/utils';
import type { IconBaseProps, IconType } from 'react-icons/lib';
import type { FlightFilters } from '@/types';

type ResetFieldIconProps = {
    fieldName: keyof FlightFilters;
    icon?: IconType;
} & IconBaseProps;

export default function ResetFieldIcon({
    fieldName,
    icon,
    className,
    onClick,
    ...rest
}: ResetFieldIconProps) {
    const {
        field: { value, onChange },
    } = useController<FlightFilters>({ name: fieldName });
    const Icon = icon || MdCancel;

    if (!value) return null;

    const handleCancelClick = (event: React.MouseEvent<SVGElement>) => {
        event.stopPropagation();

        onChange();

        onClick && onClick(event);
    };

    return (
        <Icon
            className={cn('ml-auto h-6 min-w-6 text-purple', className)}
            onClick={handleCancelClick}
            {...rest}
        />
    );
}
