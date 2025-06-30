import SectionWrapper from "./wrapper/SectionWrapper";
import {Form, Input} from "antd";

export default function SenderSection() {
    return (
        <SectionWrapper title="Sender">
            <div className="flex gap-4">
                <div className="md:w-1/2">
                    <Form.Item
                        name="sender_name"
                        label="Name"
                        rules={[{ required: true, message: "Sender name is required" }]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className="md:w-1/2">
                    <Form.Item
                        name="sender_account"
                        label="Account ID"
                        rules={[{ required: true, message: "Sender account ID is required" }]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
            </div>
        </SectionWrapper>
    )
}