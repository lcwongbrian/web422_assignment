import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import Link from "next/link";
import { Navbar, Nav, Container, Form, Button, NavDropdown } from "react-bootstrap";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
    const token = readToken();
    const router = useRouter();

    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const logout = () => {
        setIsExpanded(false);
        removeToken();
        router.push("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsExpanded(false);
        if (e.target[0].value && e.target[0].value != "") {
            const queryString = `title=true&q=${e.target[0].value}`;
            router.push(`/artwork?${queryString}`);
            setSearchHistory(await addToHistory(queryString));
            e.target[0].value = "";
        }
    };

    const handleToggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCloseNavbar = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Lap Chi Wong</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggleNavbar}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={handleCloseNavbar}>Home</Nav.Link>
                            </Link>
                            {token && <Link href="/search" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/search"} onClick={handleCloseNavbar}>Advanced Search</Nav.Link>
                            </Link>}
                        </Nav>
                        {!token &&
                        <Nav>
                            <Link href="/register" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/register"} onClick={handleCloseNavbar}>Register</Nav.Link>
                            </Link>
                            <Link href="/login" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/login"} onClick={handleCloseNavbar}>Login</Nav.Link>
                            </Link>
                        </Nav>
                        }
                        {token &&
                        <>
                            &nbsp;                        
                            <Form className="d-flex" onSubmit={handleSubmit}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="success" type="submit">Search</Button>
                            </Form>
                            &nbsp;
                            <Nav>
                                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/favourites" && token} onClick={handleCloseNavbar}>Favourites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/history" && token} onClick={handleCloseNavbar}>Search History</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            <br />
        </>
    );
}
