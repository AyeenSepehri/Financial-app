import { Form, Input } from "antd";
import SectionWrapper from "./wrapper/SectionWrapper";

export default function MerchantSection() {
    return (
        <SectionWrapper title="Merchant">
            <div className="flex gap-4">
                <div className="md:w-1/2">
                    <Form.Item
                        name="merchant"
                        label="Name"
                        rules={[{ required: true, message: "Merchant name is required" }]}
                    >
                        <Input placeholder="e.g. GroceryMart" />
                    </Form.Item>
                </div>
                <div className="md:w-1/2">
                    <Form.Item
                        name="merchant_id"
                        label="ID"
                        rules={[
                            { required: true, message: "Merchant ID is required" },
                            {
                                pattern: /^mcht_\d+$/,
                                message: "ID must start with mcht_ and followed by numbers",
                            },
                        ]}
                    >
                        <Input placeholder="e.g. mcht_011" />
                    </Form.Item>
                </div>
            </div>
        </SectionWrapper>
    );
}
