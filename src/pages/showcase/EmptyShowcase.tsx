import { Bell, Star, User } from "lucide-react";
import { Button } from "@/components/common";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions } from "@figma/components/empty";
import { Section, Row, PageHeader } from "./helpers";

export function EmptyShowcase() {
    return (
        <div className="space-y-8">
            <PageHeader title="Empty State" description="Placeholder content for empty lists, search results, and zero-data screens." />

            <Section title="Variants">
                <Row label="default">
                    <Empty className="w-64">
                        <EmptyMedia><Bell size={20} className="text-muted-foreground" /></EmptyMedia>
                        <EmptyTitle>ไม่มีการแจ้งเตือน</EmptyTitle>
                        <EmptyDescription>คุณยังไม่มีการแจ้งเตือนใดๆ ในขณะนี้</EmptyDescription>
                    </Empty>
                </Row>
                <Row label="outline">
                    <Empty variant="outline" className="w-72">
                        <EmptyMedia><Star size={20} className="text-muted-foreground" /></EmptyMedia>
                        <EmptyTitle>ไม่พบข้อมูล</EmptyTitle>
                        <EmptyDescription>ลองค้นหาด้วยคำอื่น หรือเพิ่มข้อมูลใหม่</EmptyDescription>
                        <EmptyActions>
                            <Button size="sm" variant="primary">เพิ่มใหม่</Button>
                        </EmptyActions>
                    </Empty>
                </Row>
                <Row label="background">
                    <Empty variant="background" className="w-72">
                        <EmptyMedia><User size={20} className="text-muted-foreground" /></EmptyMedia>
                        <EmptyTitle>ไม่พบพนักงาน</EmptyTitle>
                        <EmptyDescription>ยังไม่มีพนักงานในระบบ</EmptyDescription>
                    </Empty>
                </Row>
            </Section>
        </div>
    );
}
