import {DatePicker, Form, Input, InputNumber, Select} from "antd";
import SectionWrapper from "./wrapper/SectionWrapper";

const { TextArea } = Input;

export default function TransactionSection() {
    return (
        <SectionWrapper title="Transaction">
            <div>
                <div className="flex gap-4">
                    <div className="md:w-1/4">
                        <Form.Item
                            name="amount"
                            label="Amount"
                            rules={[{ required: true, message: "Amount is required" }]}
                        >
                            <InputNumber min={0} style={{width: '100%'}}/>
                        </Form.Item>
                    </div>

                    <div className="md:w-1/4">
                        <Form.Item
                            name="currency"
                            label="Currency"
                            rules={[{ required: true, message: "Currency is required" }]}
                        >
                            <Input/>
                        </Form.Item>
                    </div>

                    <div className="md:w-1/4">
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: "Status is required" }]}
                        >
                            <Select
                                options={[
                                    {value: 'completed', label: 'Completed'},
                                    {value: 'pending', label: 'Pending'},
                                    {value: 'failed', label: 'Failed'},
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <div className="md:w-1/4">
                        <Form.Item
                            name="timestamp"
                            label="Timestamp"
                            rules={[{ required: true, message: "Timestamp is required" }]}
                        >
                            <DatePicker showTime style={{width: '100%'}}/>
                        </Form.Item>
                    </div>
                </div>

                <Form.Item name="description" label="Description">
                    <TextArea rows={3} maxLength={150} showCount/>
                </Form.Item>
            </div>
        </SectionWrapper>
    )
}