import {
    Avatar, AvatarImage, AvatarFallback, AvatarGroup,
} from "@/components/common";
import { Section, Row, PageHeader } from "./helpers";

export function AvatarShowcase() {
    return (
        <div className="space-y-8">
            <PageHeader title="Avatar" description="User profile pictures with fallback initials, badges, and groups." />

            <Section title="Sizes — image">
                <Row label="sm / default / lg">
                    <Avatar size="sm">
                        <AvatarImage src="https://i.pravatar.cc/64?img=1" alt="User" />
                        <AvatarFallback size="sm">CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="default">
                        <AvatarImage src="https://i.pravatar.cc/64?img=2" alt="User" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                        <AvatarImage src="https://i.pravatar.cc/64?img=3" alt="User" />
                        <AvatarFallback size="lg">CN</AvatarFallback>
                    </Avatar>
                </Row>
            </Section>

            <Section title="Sizes — fallback initials">
                <Row label="sm / default / lg">
                    <Avatar size="sm"><AvatarFallback size="sm">สช</AvatarFallback></Avatar>
                    <Avatar size="default"><AvatarFallback>สช</AvatarFallback></Avatar>
                    <Avatar size="lg"><AvatarFallback size="lg">สช</AvatarFallback></Avatar>
                </Row>
            </Section>

            <Section title="With online badge">
                <Row label="sm / default / lg">
                    <Avatar size="sm" badge>
                        <AvatarImage src="https://i.pravatar.cc/64?img=4" alt="User" />
                        <AvatarFallback size="sm">CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="default" badge>
                        <AvatarFallback>สด</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" badge>
                        <AvatarFallback size="lg">สช</AvatarFallback>
                    </Avatar>
                </Row>
            </Section>

            <Section title="Broken image → fallback">
                <Row label="fallback on error">
                    <Avatar size="default">
                        <AvatarImage src="/does-not-exist.jpg" alt="User" />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </Row>
            </Section>

            <Section title="Group">
                <Row label="overlapping">
                    <AvatarGroup>
                        <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/64?img=10" alt="A" /><AvatarFallback size="sm">A</AvatarFallback></Avatar>
                        <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/64?img=11" alt="B" /><AvatarFallback size="sm">B</AvatarFallback></Avatar>
                        <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/64?img=12" alt="C" /><AvatarFallback size="sm">C</AvatarFallback></Avatar>
                        <Avatar size="sm"><AvatarFallback size="sm">+3</AvatarFallback></Avatar>
                    </AvatarGroup>
                </Row>
            </Section>
        </div>
    );
}
