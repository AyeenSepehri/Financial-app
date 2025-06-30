import { Form } from "antd";
import MerchantSection from "@/components/transactions/form/sections/MerchantSection";
import TransactionSection from "@/components/transactions/form/sections/TransactionSection";
import PaymentMethodSection from "@/components/transactions/form/sections/PaymentMethodSection";
import SenderSection from "@/components/transactions/form/sections/SenderSection";
import ReceiverSection from "@/components/transactions/form/sections/ReceiverSection";
import FeesSection from "@/components/transactions/form/sections/FeesSection";
import MetadataSection from "@/components/transactions/form/sections/MetadataSection";

export default function AddForm() {
    const [form] = Form.useForm();

    return (
        <Form layout="vertical" form={form}>

            <TransactionSection/>

            <MerchantSection/>

            <PaymentMethodSection/>

            <SenderSection/>

            <ReceiverSection/>

            <FeesSection/>

            <MetadataSection/>
        </Form>
    );
}
