import React from 'react';

//For accessbility improvments
export default function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return <span className="visually-hidden">{children}</span>;
}
