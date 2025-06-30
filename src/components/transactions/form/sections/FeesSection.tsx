import SectionWrapper from "./wrapper/SectionWrapper";
import {Form, Input, InputNumber} from "antd";

export default function FeesSection() {
    return (
        <SectionWrapper title="Fees">
            <div className="flex gap-4">
                <div className="md:w-1/2">
                    <Form.Item
                        name="fee"
                        label="Processing Fee"
                        rules={[{ required: true, message: "Processing fee is required" }]}
                    >
                        <InputNumber min={0} style={{width: '100%'}}/>
                    </Form.Item>
                </div>
                <div className="md:w-1/2">
                    <Form.Item
                        name="fee_currency"
                        label="Currency"
                        rules={[{ required: true, message: "Fee currency is required" }]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
            </div>
        </SectionWrapper>
    )
}