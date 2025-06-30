import { ReactNode } from "react";
import { Divider } from "antd";

type Props = {
    title: string;
    children: ReactNode;
};

export default function SectionWrapper({ title, children }: Props) {
    return (
        <div className="mt-6">
            <h2 className="text-xl text-gray-600">{title}</h2>
            <Divider />
            {children}
        </div>
    );
}
