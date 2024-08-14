import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

type StarsPropsCount = {
    rate: number;
};

export default function RateStars({ rate }: StarsPropsCount) {
    return (
        <div className="relative grid grid-cols-3 gap-px">
            {Array.from({ length: 6 }, (_, index) => {
                const Icon = index < rate ? IoMdStar : IoMdStarOutline;

                return <Icon key={index} className="size-4" />;
            })}
        </div>
    );
}
