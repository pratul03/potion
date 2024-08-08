import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-full bg-emerald-400">{children}</div>
    );
};

export default RootLayout;
