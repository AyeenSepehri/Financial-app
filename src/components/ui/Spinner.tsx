"use client";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center w-full h-64 bg-white border border-gray-200 rounded-md shadow-sm">
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
                tip="Loading..."
                size="large"
                className="text-gray-700"
            />
        </div>
    );
}
