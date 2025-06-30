import SectionWrapper from "./wrapper/SectionWrapper";
import {Form, Input} from "antd";

export default function MetadataSection() {
    return (
        <SectionWrapper title="Metadata">
            <div className="flex gap-4">
                <div className="md:w-1/2">
                    <Form.Item
                        name="order_id"
                        label="Order ID"
                        rules={[{ required: true, message: "Order ID is required" }]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className="md:w-1/2">
                    <Form.Item
                        name="customer_id"
                        label="Customer ID"
                        rules={[{ required: true, message: "Customer ID is required" }]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
            </div>
        </SectionWrapper>
    )
}