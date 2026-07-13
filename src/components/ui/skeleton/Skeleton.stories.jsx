import Skeleton, { SkeletonCircle, SkeletonText } from './Skeleton';

export default {
    title: 'UI/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
};

export const Bloco = {
    args: {
        className: 'h-5 w-64',
    },
};

export const Badge = {
    args: {
        className: 'h-8 w-[150px] rounded-full',
    },
};

export const Circulo = {
    render: () => <SkeletonCircle className="h-12 w-12" />,
};

export const Texto = {
    render: () => (
        <div className="w-80">
            <SkeletonText lines={4} />
        </div>
    ),
};

export const CardExemplo = {
    render: () => (
        <div className="flex items-center gap-4 w-96 rounded-xl border border-gray-100 p-4 shadow-sm">
            <SkeletonCircle className="h-10 w-10 shrink-0" />
            <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    ),
};
