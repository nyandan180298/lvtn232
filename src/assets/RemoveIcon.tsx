function RemoveIcon() {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width={16} height={16} rx={8} fill="#FF5F73" />
            <path
                d="M4 8h8"
                stroke="#fff"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default RemoveIcon;
