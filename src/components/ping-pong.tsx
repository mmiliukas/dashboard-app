import { Button, Card, Text } from '@wix/design-system';
import { useCallback, useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export function PingPong() {
    const fetch = useFetch();
    const [state, setState] = useState<string>("");

    const ping = useCallback(() => {
        fetch("/ping")
            .then((result) => setState(JSON.stringify(result)))
            .catch(error => setState(error.message))
    }, [fetch]);

    return (
        <Card>
            <Card.Header title="Ping Pong" />
            <Card.Divider />
            <Card.Content>
                <Button size="small" onClick={ping}>Ping</Button>
                <Text>{state}</Text>
            </Card.Content>
        </Card>
    )
}
