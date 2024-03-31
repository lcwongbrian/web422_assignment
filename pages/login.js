import { useState } from 'react';
import { useRouter } from "next/router";
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites, getHistory } from '@/lib/userData';
import { Alert, Card, Form, Button } from "react-bootstrap";

export default function Login() {
    const router = useRouter();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const updateAtoms = async () => {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authenticateUser(user, password);
            await updateAtoms();
            router.push("/favourites");
        } catch (err) {
            setWarning(err.message);
        }
    };

    return (
        <>
            <Card bg="light">
                <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" id="userName" name="userName" value={user} onChange={e => setUser(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                { warning && (
                    <>
                        <br />
                        <Alert variant="danger">{warning}</Alert>
                    </> 
                )}
                <br />
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
            </Form>            
        </>
    );
}