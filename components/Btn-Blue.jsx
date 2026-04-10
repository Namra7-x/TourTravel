const SIZE_CLASSES = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

const VARIANT_CLASSES = {
    primary: "bg-[#558ffc] text-white hover:bg-black",
    light: "bg-white text-black hover:bg-[rgb(86,87,92)] hover:text-white",
};

const BtnBlue = ({
    title,
    children,
    size = "md",
    variant = "primary",
    className = "",
    type = "button",
    ...props
}) => {
    const label = children ?? title;

    return (
        <button
            type={type}
            className={[
                "inline-flex items-center justify-center rounded-full cursor-pointer font-medium text-center whitespace-nowrap transition-all duration-300",
                SIZE_CLASSES[size] || SIZE_CLASSES.md,
                VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
                className,
            ].join(" ")}
            {...props}
        >
            {label}
        </button>
    );
};

export default BtnBlue;
