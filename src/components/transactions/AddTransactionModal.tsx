'use client';

import { Modal, Form} from 'antd';
import { Transaction } from '@/features/transactions/types';
import AddForm from "@/components/transactions/form/AddForm";


type Props = {
    visible: boolean;
    onClose: () => void;
    onAdd: (txn: Omit<Transaction, 'id'>) => void;
};

export default function AddTransactionModal({ visible, onClose, onAdd }: Props) {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const newTxn = {
                ...values,
                timestamp: values.timestamp.toISOString(),
            };
            onAdd(newTxn);
            form.resetFields();
        } catch (error) {
            console.log("Validation failed:", error);
        }
    };

    return (
        <Modal
            title="Add New Transaction"
            open={visible}
            onCancel={onClose}
            onOk={handleSubmit}
            okText="Add"
            width="70%"
            styles={{
                body: {
                    maxHeight: "60vh",
                    overflowY: "auto",
                    paddingRight: "12px",
                },
            }}
        >
            <AddForm />
        </Modal>


    );
}
