import React from 'react'

type props = React.HTMLAttributes<HTMLLabelElement> & {
    name: string;
    className?: string;
}
export const Label = ({ name, ...props }: props) => {
    return (
        <label {...props} className="text-white/20 uppercase text-sm font-label font-medium">{ name }</label>
    )
}

