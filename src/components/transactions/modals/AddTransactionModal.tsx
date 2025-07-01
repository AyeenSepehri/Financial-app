'use client';

import { Modal, Form } from 'antd';
import { Transaction } from '@/features/transactions/types';
import AddForm from '@/components/transactions/form/AddForm';
import { toast } from "react-toastify";

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

            const newTransaction: Omit<Transaction, 'id'> = {
                amount: values.amount,
                currency: values.currency,
                status: values.status,
                timestamp: values.timestamp,
                description: values.description || "",

                merchant: {
                    name: values.merchant,
                    id: values.merchant_id,
                },

                payment_method: {
                    type: values.payment_type,
                    brand: values.payment_brand,
                    last4: values.payment_last4 || "",
                },

                sender: {
                    name: values.sender_name,
                    account_id: values.sender_account,
                },

                receiver: {
                    name: values.receiver_name,
                    account_id: values.receiver_account,
                },

                fees: {
                    processing_fee: values.fee,
                    currency: values.fee_currency,
                },

                metadata: {
                    order_id: values.order_id,
                    customer_id: values.customer_id,
                },
            };

            onAdd(newTransaction);
            form.resetFields();
        } catch (err) {
            const error = err as { errorFields: Array<{ name: string[] }> };

            if (error?.errorFields?.[0]?.name) {
                form.scrollToField(error.errorFields[0].name);
            }
            toast.error("Please fill in all required fields.");
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
            <AddForm form={form} />
        </Modal>
    );
}
