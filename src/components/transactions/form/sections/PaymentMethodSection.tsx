import SectionWrapper from "./wrapper/SectionWrapper";
import {Form, Input} from "antd";

export default function PaymentMethodSection() {
    return (
        <SectionWrapper title="Payment Method">
            <div className="flex gap-4">
                <div className="md:w-1/3">
                    <Form.Item
                        name="payment_type"
                        label="Type"
                        rules={[{ required: true, message: "Payment type is required" }]}
                    >
                        <Input placeholder="e.g. credit_card, paypal"/>
                    </Form.Item>
                </div>
                <div className="md:w-1/3">
                    <Form.Item
                        name="payment_brand"
                        label="Brand"
                        rules={[{ required: true, message: "Payment brand is required" }]}
                    >
                        <Input placeholder="e.g. visa, amex"/>
                    </Form.Item>
                </div>
                <div className="md:w-1/3">

                    <Form.Item
                        name="payment_last4"
                        label="Last 4 digits"
                        rules={[
                            {
                                pattern: /^[0-9]{4}$/,
                                message: "Must be 4 digits",
                            },
                        ]}
                    >
                        <Input maxLength={4} placeholder="Optional"/>
                    </Form.Item>
                </div>
            </div>
        </SectionWrapper>
    )
}