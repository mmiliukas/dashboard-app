import { Button, Card, Text } from '@wix/design-system';
import { useCallback, useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export function ParseInstance() {
    const fetch = useFetch();
    const [state, setState] = useState<string>("");

    const parse = useCallback(() => {
        fetch("/instance")
            .then((result) => setState(JSON.stringify(result)))
            .catch(error => setState(error.message))
    }, [fetch]);

    return (
        <Card>
            <Card.Header title="Parse Instance on server" />
            <Card.Divider />
            <Card.Content>
                <Button size="small" onClick={parse}>Parse</Button>
                <Text>{state}</Text>
            </Card.Content>
        </Card>
    )
}
