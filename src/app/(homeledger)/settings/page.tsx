"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BsPersonCircle } from "react-icons/bs";
import { PageHeader } from "@/components/PageHeader";
import {
    MdOutlineEmail,
    MdOutlineLock,
    MdOutlineNotifications,
    MdOutlineLanguage,
    MdOutlinePalette,
    MdOutlineCreditCard,
    MdOutlineLogout,
} from "react-icons/md";

type SwitchProps = {
    checked: boolean;
    onChange: (v: boolean) => void;
};

const Switch = ({ checked, onChange }: SwitchProps) => (
    <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
            checked ? "bg-(--primary)" : "bg-white/10"
        }`}
    >
        <span
            className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                checked ? "translate-x-5" : "translate-x-0"
            }`}
        />
    </button>
);

type RowProps = {
    icon: React.ElementType;
    label: string;
    description?: string;
    children?: React.ReactNode;
};

const Row = ({ icon: Icon, label, description, children }: RowProps) => (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3.5 hover:bg-white/[0.06] transition-colors">
        <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="bg-(--bg-surface-container-highest) p-2.5 rounded-full">
                <Icon className="text-white w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate">
                    {label}
                </span>
                {description && (
                    <span className="text-xs text-white/50 truncate">
                        {description}
                    </span>
                )}
            </div>
        </div>
        <div className="flex-shrink-0">{children}</div>
    </div>
);

const Page = () => {
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(false);
    const [billsNotif, setBillsNotif] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                eyebrow="Your account"
                title="Settings"
                subtitle="Manage your profile, preferences, and security"
            />

            {/* Profile Card */}
            <Card variant="dark" className="gap-5">
                <CardHeader className="text-left">Profile</CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <BsPersonCircle className="text-white w-14 h-14" />
                        <div className="flex flex-col">
                            <h2 className="text-lg text-white font-semibold">
                                Zee Ahmadi
                            </h2>
                            <span className="text-sm text-white/50">
                                asam79961@gmail.com
                            </span>
                            <Badge variant="info" className="mt-2">
                                Pro Plan
                            </Badge>
                        </div>
                    </div>
                    <Button variant="outlined">Edit Profile</Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Account */}
                <Card variant="dark" className="gap-4">
                    <CardHeader className="text-left">Account</CardHeader>
                    <div className="flex flex-col gap-2">
                        <Row
                            icon={MdOutlineEmail}
                            label="Email"
                            description="asam79961@gmail.com"
                        >
                            <Button variant="outlined" className="text-xs px-4 py-1">
                                Change
                            </Button>
                        </Row>
                        <Row
                            icon={MdOutlineLock}
                            label="Password"
                            description="Last updated 2 months ago"
                        >
                            <Button variant="outlined" className="text-xs px-4 py-1">
                                Update
                            </Button>
                        </Row>
                        <Row
                            icon={MdOutlineCreditCard}
                            label="Linked Accounts"
                            description="2 banks connected"
                        >
                            <Button variant="outlined" className="text-xs px-4 py-1">
                                Manage
                            </Button>
                        </Row>
                    </div>
                </Card>

                {/* Notifications */}
                <Card variant="dark" className="gap-4">
                    <CardHeader className="text-left">Notifications</CardHeader>
                    <div className="flex flex-col gap-2">
                        <Row
                            icon={MdOutlineEmail}
                            label="Email Alerts"
                            description="Weekly summary in your inbox"
                        >
                            <Switch checked={emailNotif} onChange={setEmailNotif} />
                        </Row>
                        <Row
                            icon={MdOutlineNotifications}
                            label="Push Notifications"
                            description="Real-time updates on your device"
                        >
                            <Switch checked={pushNotif} onChange={setPushNotif} />
                        </Row>
                        <Row
                            icon={MdOutlineNotifications}
                            label="Upcoming Bills"
                            description="Remind me 3 days before due"
                        >
                            <Switch checked={billsNotif} onChange={setBillsNotif} />
                        </Row>
                    </div>
                </Card>

                {/* Security */}
                <Card variant="dark" className="gap-4">
                    <CardHeader className="text-left">Security</CardHeader>
                    <div className="flex flex-col gap-2">
                        <Row
                            icon={MdOutlineLock}
                            label="Two-Factor Auth"
                            description="Adds an extra step at sign-in"
                        >
                            <Switch checked={twoFactor} onChange={setTwoFactor} />
                        </Row>
                        <Row
                            icon={MdOutlineLock}
                            label="Active Sessions"
                            description="Devices currently signed in"
                        >
                            <Button variant="outlined" className="text-xs px-4 py-1">
                                Review
                            </Button>
                        </Row>
                    </div>
                </Card>

                {/* Preferences */}
                <Card variant="dark" className="gap-4">
                    <CardHeader className="text-left">Preferences</CardHeader>
                    <div className="flex flex-col gap-2">
                        <Row
                            icon={MdOutlineLanguage}
                            label="Language"
                            description="English (Australia)"
                        >
                            <Button variant="outlined" className="text-xs px-4 py-1">
                                Change
                            </Button>
                        </Row>
                        <Row
                            icon={MdOutlinePalette}
                            label="Theme"
                            description="Dark"
                        >
                            <Button variant="outlined" className="text-xs px-4 py-1">
                                Switch
                            </Button>
                        </Row>
                        <Row
                            icon={MdOutlineCreditCard}
                            label="Default Currency"
                            description="AUD — Australian Dollar"
                        >
                            <Button variant="outlined" className="text-xs px-4 py-1">
                                Change
                            </Button>
                        </Row>
                    </div>
                </Card>
            </div>

            {/* Danger zone */}
            <Card variant="dark" className="gap-3 border-(--error)/20">
                <CardHeader className="text-left text-(--error)/70">Danger Zone</CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <MdOutlineLogout className="text-(--error) w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">
                                Sign out
                            </span>
                            <span className="text-xs text-white/50">
                                You will need to sign back in to use homeledger
                            </span>
                        </div>
                    </div>
                    <button className="text-xs font-medium px-4 py-2 rounded-full bg-(--error)/15 text-(--error) hover:bg-(--error)/25 transition-colors">
                        Log out
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Page;
