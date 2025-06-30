import SectionWrapper from "./wrapper/SectionWrapper";
import {Form, Input} from "antd";

export default function ReceiverSection() {
    return (
        <SectionWrapper title="Receiver">
            <div className="flex gap-4">
                <div className="md:w-1/2">
                    <Form.Item
                        name="receiver_name"
                        label="Name"
                        rules={[{required: true, message: "Receiver name is required"}]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className="md:w-1/2">
                    <Form.Item
                        name="receiver_account"
                        label="Account ID"
                        rules={[{required: true, message: "Receiver account ID is required"}]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
            </div>
        </SectionWrapper>
    )
}