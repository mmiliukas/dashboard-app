import { useDashboard } from '@wix/dashboard-react';
import { Box, Button, Card } from '@wix/design-system';

export function DashboardActions() {
    const { showToast, openMediaManager, openModal, closeModal } = useDashboard();

    return (
        <Card>
            <Card.Header title="Dashboard Actions" />
            <Card.Divider />
            <Card.Content>
                <Box gap="12px">
                    <Button size="small" onClick={() => openModal('be156542-c7c4-4ce6-b5a9-c1470570f5c6')}>Open Modal</Button>
                    <Button size="small" onClick={() => closeModal('be156542-c7c4-4ce6-b5a9-c1470570f5c6')}>Close Modal</Button>
                    <Button size="small" onClick={() => openMediaManager()}>Open Media Manager</Button>
                    <Button size="small" onClick={() => showToast({ message: 'You clicked me. Great success!' })}>Show Toast</Button>
                </Box>
            </Card.Content>
        </Card>
    )
}
