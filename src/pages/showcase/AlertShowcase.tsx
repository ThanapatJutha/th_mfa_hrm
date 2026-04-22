import { AlertCircle, Info } from "lucide-react";
import {
    Alert, AlertIcon, AlertContent,
    AlertTitle, AlertDescription, AlertAction,
    Button,
} from "@/components/common";
import { Section, PageHeader } from "./helpers";

export function AlertShowcase() {
    return (
        <div className="space-y-8">
            <PageHeader title="Alert" description="Contextual feedback messages — default and destructive variants." />

            <Section title="Default">
                <div className="space-y-3 max-w-xl">
                    <Alert variant="default">
                        <AlertIcon><Info /></AlertIcon>
                        <AlertContent>
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
                        </AlertContent>
                        <AlertAction>
                            <Button size="sm" variant="secondary">Enable</Button>
                        </AlertAction>
                    </Alert>

                    <Alert variant="default">
                        <AlertIcon><Info /></AlertIcon>
                        <AlertContent>
                            <AlertTitle>Information</AlertTitle>
                            <AlertDescription>This is a default alert without an action button.</AlertDescription>
                        </AlertContent>
                    </Alert>
                </div>
            </Section>

            <Section title="Destructive">
                <div className="space-y-3 max-w-xl">
                    <Alert variant="destructive">
                        <AlertIcon><AlertCircle /></AlertIcon>
                        <AlertContent>
                            <AlertTitle>Something went wrong</AlertTitle>
                            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
                        </AlertContent>
                        <AlertAction>
                            <Button size="sm" variant="destructive-outline">Retry</Button>
                        </AlertAction>
                    </Alert>

                    <Alert variant="destructive">
                        <AlertIcon><AlertCircle /></AlertIcon>
                        <AlertContent>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>Failed to save changes. Please try again later.</AlertDescription>
                        </AlertContent>
                    </Alert>
                </div>
            </Section>
        </div>
    );
}
