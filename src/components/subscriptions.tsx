import { useDashboard } from '@wix/dashboard-react';
import { Badge, Button, Card, Cell, FormField, Input, Layout, Table } from '@wix/design-system';
import { useCallback, useEffect, useState } from 'react';
import { useFetch, usePost } from '../hooks/useFetch';

export function Subscriptions() {
    const fetch = useFetch();
    const post = usePost();
    const { showToast } = useDashboard();

    const [email, setEmail] = useState<string>("");
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        fetch('/subscriptions').then(result => {
            setSubscriptions(result.subscriptions || []);
        }).catch(error => {
            console.error(error);
        });
    }, [fetch]);

    const subscribe = useCallback(() => {
        post('/subscriptions', { email }).then(result => {
            console.log(result);
            showToast({
                message: 'Subscribed',
                type: "success",
            });
            fetch('/subscriptions').then(result => {
                setSubscriptions(result.subscriptions || []);
            }).catch(error => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
            showToast({
                message: 'Subscription failed',
                type: "error",
            });
        });
    }, [fetch, email]);

    return (
        <>
            <Card>
                <Card.Header title="Subscriptions" />
                <Card.Divider />
                <Card.Content>
                    <Layout cols={1}>
                        <Cell span={1}>
                            <FormField label="Email">
                                <Input value={email} onChange={(e: any) => setEmail(e.target.value)} />
                            </FormField>
                        </Cell>
                        <Cell span={1}>
                            <Button size="small" priority="secondary" onClick={subscribe}>Subscribe</Button>
                        </Cell>
                    </Layout>
                </Card.Content>
            </Card>
            <Table skin="standard" data={subscriptions} columns={[
                {
                    title: 'Deliverability status',
                    render: (row: any) => <Badge size="small">{row.deliverabilityStatus}</Badge>,
                },
                {
                    title: 'Email',
                    render: (row: any) => row.email,
                },
                {
                    title: 'Subscription status',
                    render: (row: any) => <Badge size="small">{row.subscriptionStatus}</Badge>
                },
                {
                    title: 'Created At',
                    render: (row: any) => row._createdDate,
                },
            ]} />
        </>
    );
}